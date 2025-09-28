import { useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Building {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
  elevatorStatus: 'good' | 'moderate' | 'busy';
  reports: number;
  facilities: string[];
}

interface Report {
  id: string;
  x: number;
  y: number;
  title: string;
  category: string;
  status: 'pending' | 'processing' | 'resolved';
}

const CampusMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      x: 45,
      y: 35,
      title: '화장실 청소 필요',
      category: '시설',
      status: 'pending'
    },
    {
      id: '2',
      x: 60,
      y: 50,
      title: '경사로 파손',
      category: '접근성',
      status: 'processing'
    }
  ]);
  
  const [isReporting, setIsReporting] = useState(false);

  const buildings: Building[] = [
    {
      id: 'k',
      name: '김수환관',
      code: 'K관',
      x: 35,
      y: 40,
      elevatorStatus: 'good',
      reports: 2,
      facilities: ['엘리베이터', '장애인화장실', '경사로', '점자블록']
    },
    {
      id: 'm',
      name: '마리아관',
      code: 'M관',
      x: 65,
      y: 45,
      elevatorStatus: 'busy',
      reports: 5,
      facilities: ['엘리베이터', '장애인화장실', '휠체어리프트']
    },
    {
      id: 'l',
      name: '라파엘관',
      code: 'L관',
      x: 20,
      y: 60,
      elevatorStatus: 'moderate',
      reports: 1,
      facilities: ['엘리베이터', '경사로']
    },
    {
      id: 'b',
      name: '베르나르도관',
      code: 'B관',
      x: 80,
      y: 30,
      elevatorStatus: 'good',
      reports: 0,
      facilities: ['엘리베이터', '장애인화장실', '경사로', '점자블록', '휠체어리프트']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-status-good';
      case 'moderate':
        return 'bg-status-moderate';
      case 'busy':
        return 'bg-status-busy';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good':
        return '원활';
      case 'moderate':
        return '보통';
      case 'busy':
        return '혼잡';
      default:
        return '알 수 없음';
    }
  };

  const handleMapClick = (e: React.MouseEvent<SVGElement>) => {
    if (!isReporting) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newReport: Report = {
      id: Date.now().toString(),
      x,
      y,
      title: '새 제보',
      category: '기타',
      status: 'pending'
    };

    setReports([...reports, newReport]);
    setIsReporting(false);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-campus rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button
          onClick={() => setIsReporting(!isReporting)}
          variant={isReporting ? "destructive" : "default"}
          size="sm"
          className="shadow-campus"
        >
          {isReporting ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {isReporting ? '취소' : '제보하기'}
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-card/95 backdrop-blur-sm border shadow-campus">
          <CardContent className="p-3">
            <div className="text-sm font-medium mb-2">엘리베이터 상태</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-status-good"></div>
                <span>원활</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-status-moderate"></div>
                <span>보통</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-status-busy"></div>
                <span>혼잡</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campus Map SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full cursor-pointer"
        onClick={handleMapClick}
        style={{ cursor: isReporting ? 'crosshair' : 'default' }}
      >
        {/* Campus Background */}
        <rect width="100" height="100" fill="hsl(var(--campus-light))" />
        
        {/* Campus Paths */}
        <path
          d="M 10 20 Q 50 15 90 25 L 90 75 Q 50 85 10 80 Z"
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
        />
        
        {/* Green Areas */}
        <circle cx="25" cy="25" r="8" fill="hsl(120, 40%, 70%)" opacity="0.6" />
        <circle cx="75" cy="70" r="10" fill="hsl(120, 40%, 70%)" opacity="0.6" />
        <ellipse cx="50" cy="80" rx="15" ry="6" fill="hsl(120, 40%, 70%)" opacity="0.6" />

        {/* Buildings */}
        {buildings.map((building) => (
          <g key={building.id}>
            {/* Building Shape */}
            <rect
              x={building.x - 4}
              y={building.y - 3}
              width="8"
              height="6"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              rx="1"
              className="cursor-pointer hover:fill-accent transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBuilding(building);
              }}
            />
            
            {/* Elevator Status Indicator */}
            <circle
              cx={building.x + 3}
              cy={building.y - 4}
              r="1.5"
              className={`${getStatusColor(building.elevatorStatus)} stroke-white`}
              strokeWidth="0.3"
            />
            
            {/* Building Label */}
            <text
              x={building.x}
              y={building.y + 6}
              textAnchor="middle"
              className="text-xs fill-foreground font-medium"
              style={{ fontSize: '2px' }}
            >
              {building.code}
            </text>
            
            {/* Report Count */}
            {building.reports > 0 && (
              <circle
                cx={building.x - 3}
                cy={building.y - 4}
                r="1.2"
                fill="hsl(var(--primary))"
              />
            )}
          </g>
        ))}

        {/* User Reports */}
        {reports.map((report) => (
          <g key={report.id}>
            <circle
              cx={report.x}
              cy={report.y}
              r="1"
              fill="hsl(var(--destructive))"
              stroke="white"
              strokeWidth="0.3"
              className="cursor-pointer"
            />
          </g>
        ))}
      </svg>

      {/* Building Detail Modal */}
      {selectedBuilding && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
          <Card className="w-full max-w-md mx-4 shadow-elevated">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedBuilding.name}</h3>
                  <p className="text-muted-foreground">{selectedBuilding.code}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBuilding(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedBuilding.elevatorStatus)}`}></div>
                    <span className="font-medium">엘리베이터: {getStatusText(selectedBuilding.elevatorStatus)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">이용 가능한 복지시설</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedBuilding.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedBuilding.reports > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      현재 {selectedBuilding.reports}건의 제보가 있습니다.
                    </p>
                  </div>
                )}

                <Button className="w-full" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  길찾기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reporting Instructions */}
      {isReporting && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-card/95 backdrop-blur-sm border shadow-campus">
            <CardContent className="p-3">
              <p className="text-sm text-center">지도에서 제보할 위치를 클릭하세요</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CampusMap;