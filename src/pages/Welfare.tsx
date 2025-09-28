import { useState } from "react";
import { Heart, MapPin, Clock, Phone, Info, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WelfareFacility {
  id: string;
  name: string;
  category: string;
  building: string;
  floor: string;
  description: string;
  hours: string;
  contact?: string;
  status: 'available' | 'maintenance' | 'unavailable';
  features: string[];
}

const Welfare = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterBuilding, setFilterBuilding] = useState("all");

  const facilities: WelfareFacility[] = [
    {
      id: '1',
      name: '장애인 전용 화장실',
      category: '시설',
      building: '김수환관',
      floor: '1층',
      description: '휠체어 접근 가능한 장애인 전용 화장실입니다.',
      hours: '24시간',
      status: 'available',
      features: ['휠체어 접근', '비상벨', '기저귀 교환대']
    },
    {
      id: '2',
      name: '엘리베이터',
      category: '장비',
      building: '김수환관',
      floor: '1-6층',
      description: '음성 안내 및 점자 표기가 있는 엘리베이터입니다.',
      hours: '운영시간 내',
      status: 'maintenance',
      features: ['음성 안내', '점자 표기', '휠체어 접근']
    },
    {
      id: '3',
      name: '장애학생지원센터',
      category: '서비스',
      building: '마리아관',
      floor: '2층',
      description: '장애학생을 위한 각종 지원 서비스를 제공합니다.',
      hours: '09:00-18:00',
      contact: '02-2164-4000',
      status: 'available',
      features: ['학습 지원', '상담', '보조기기 대여', '이동 지원']
    },
    {
      id: '4',
      name: '휠체어 경사로',
      category: '시설',
      building: '라파엘관',
      floor: '입구',
      description: '휠체어 및 보행 보조기구 이용자를 위한 경사로입니다.',
      hours: '24시간',
      status: 'available',
      features: ['미끄럼 방지', '핸드레일', '완만한 경사']
    },
    {
      id: '5',
      name: '점자블록',
      category: '시설',
      building: '베르나르도관',
      floor: '입구-엘리베이터',
      description: '시각장애인을 위한 점자블록이 설치되어 있습니다.',
      hours: '24시간',
      status: 'available',
      features: ['방향 유도', '위험 경고', '목적지 안내']
    },
    {
      id: '6',
      name: '수어 통역 서비스',
      category: '서비스',
      building: '전체',
      floor: '사전 예약',
      description: '청각장애 학생을 위한 수어 통역 서비스입니다.',
      hours: '예약제',
      contact: '02-2164-4000',
      status: 'available',
      features: ['수업 통역', '행사 통역', '상담 통역']
    },
    {
      id: '7',
      name: '휠체어 리프트',
      category: '장비',
      building: '마리아관',
      floor: '3층',
      description: '계단 구간의 휠체어 리프트입니다.',
      hours: '운영시간 내',
      status: 'available',
      features: ['자동 운행', '안전 장치', '원격 조작']
    },
    {
      id: '8',
      name: '보조공학실',
      category: '서비스',
      building: '김수환관',
      floor: '5층',
      description: '장애학생을 위한 보조공학기기를 지원합니다.',
      hours: '09:00-17:00',
      contact: '02-2164-4500',
      status: 'available',
      features: ['화면확대기', '점자프린터', '음성인식기', '특수키보드']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-status-good text-white';
      case 'maintenance':
        return 'bg-status-moderate text-white';
      case 'unavailable':
        return 'bg-status-busy text-white';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '이용 가능';
      case 'maintenance':
        return '점검중';
      case 'unavailable':
        return '이용 불가';
      default:
        return '알 수 없음';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '시설':
        return '🏢';
      case '장비':
        return '⚙️';
      case '서비스':
        return '🤝';
      default:
        return '📋';
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = filterCategory === 'all' || facility.category === filterCategory;
    const matchesBuilding = filterBuilding === 'all' || facility.building.includes(filterBuilding);
    
    return matchesCategory && matchesBuilding;
  });

  const buildings = ['김수환관', '마리아관', '라파엘관', '베르나르도관'];

  return (
    <div className="min-h-screen bg-gradient-campus">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">복지시설</h1>
          <p className="text-muted-foreground">캠퍼스 내 장애학생 지원 시설 및 서비스를 확인하세요</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-campus">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="시설">시설</SelectItem>
                    <SelectItem value="장비">장비</SelectItem>
                    <SelectItem value="서비스">서비스</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterBuilding} onValueChange={setFilterBuilding}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="건물" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 건물</SelectItem>
                    {buildings.map((building) => (
                      <SelectItem key={building} value={building}>
                        {building}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFacilities.map((facility) => (
            <Card key={facility.id} className="shadow-campus hover:shadow-elevated transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(facility.category)}</span>
                    <Badge variant="outline" className="text-xs">
                      {facility.category}
                    </Badge>
                  </div>
                  <Badge className={`${getStatusColor(facility.status)} text-xs`}>
                    {getStatusText(facility.status)}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{facility.name}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{facility.building} {facility.floor}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {facility.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{facility.hours}</span>
                  </div>
                  
                  {facility.contact && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.contact}</span>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">제공 기능</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {facility.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    위치
                  </Button>
                  {facility.contact && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      연락
                    </Button>
                  )}
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <Card className="text-center py-12 shadow-campus">
            <CardContent>
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">시설이 없습니다</h3>
              <p className="text-muted-foreground">다른 필터를 시도해보세요.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Welfare;