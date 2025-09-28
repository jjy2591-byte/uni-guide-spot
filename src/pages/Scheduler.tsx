import { useState } from "react";
import { Calendar, Clock, AlertCircle, BookOpen, Users, GraduationCap } from "lucide-react";
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

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'exam' | 'registration' | 'application' | 'event';
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  target: string[];
}

const Scheduler = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");

  const events: ScheduleEvent[] = [
    {
      id: '1',
      title: '중간고사',
      type: 'exam',
      startDate: '2024-04-15',
      endDate: '2024-04-19',
      description: '2024학년도 1학기 중간고사 기간입니다.',
      importance: 'high',
      target: ['전체학과']
    },
    {
      id: '2',
      title: '수강신청',
      type: 'registration',
      startDate: '2024-02-12',
      endDate: '2024-02-16',
      time: '10:00-17:00',
      description: '2024학년도 1학기 수강신청 기간입니다.',
      importance: 'high',
      target: ['재학생']
    },
    {
      id: '3',
      title: '복수전공 신청',
      type: 'application',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      description: '복수전공 신청 기간입니다. 2학년 이상 신청 가능합니다.',
      importance: 'medium',
      target: ['2학년 이상']
    },
    {
      id: '4',
      title: '졸업논문 제출',
      type: 'application',
      startDate: '2024-05-31',
      time: '18:00까지',
      description: '졸업논문 최종 제출 마감일입니다.',
      importance: 'high',
      target: ['졸업예정자']
    },
    {
      id: '5',
      title: '개교기념일',
      type: 'event',
      startDate: '2024-04-10',
      description: '가톨릭대학교 개교기념일 (휴일)',
      importance: 'low',
      target: ['전체']
    },
    {
      id: '6',
      title: '기말고사',
      type: 'exam',
      startDate: '2024-06-10',
      endDate: '2024-06-14',
      description: '2024학년도 1학기 기말고사 기간입니다.',
      importance: 'high',
      target: ['전체학과']
    },
    {
      id: '7',
      title: '여름계절학기 신청',
      type: 'registration',
      startDate: '2024-05-20',
      endDate: '2024-05-24',
      description: '여름계절학기 수강신청 기간입니다.',
      importance: 'medium',
      target: ['희망자']
    },
    {
      id: '8',
      title: '학생회 선거',
      type: 'event',
      startDate: '2024-03-25',
      endDate: '2024-03-26',
      description: '2024년도 총학생회 선거가 실시됩니다.',
      importance: 'medium',
      target: ['전체학생']
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-500 text-white';
      case 'registration':
        return 'bg-blue-500 text-white';
      case 'application':
        return 'bg-green-500 text-white';
      case 'event':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-muted';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'exam':
        return '시험';
      case 'registration':
        return '수강신청';
      case 'application':
        return '신청/제출';
      case 'event':
        return '행사';
      default:
        return '기타';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <BookOpen className="w-4 h-4" />;
      case 'registration':
        return <Users className="w-4 h-4" />;
      case 'application':
        return <GraduationCap className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-muted';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return null;
    if (diffDays === 0) return 'D-Day';
    return `D-${diffDays}`;
  };

  const filteredEvents = events.filter(event => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const eventMonth = new Date(event.startDate).getMonth() + 1;
    const matchesMonth = filterMonth === 'all' || eventMonth.toString() === filterMonth;
    
    return matchesType && matchesMonth;
  }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const upcomingEvents = filteredEvents.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.startDate);
    return eventDate >= today;
  }).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-campus">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">스케줄러</h1>
          <p className="text-muted-foreground">학사 일정과 중요한 마감일을 한눈에 확인하세요</p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Card className="mb-6 shadow-campus border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                <span>다가오는 일정</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-accent/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {getDaysUntil(event.startDate)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.startDate)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6 shadow-campus">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="유형" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="exam">시험</SelectItem>
                    <SelectItem value="registration">수강신청</SelectItem>
                    <SelectItem value="application">신청/제출</SelectItem>
                    <SelectItem value="event">행사</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="월" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}월
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`shadow-campus hover:shadow-elevated transition-all duration-200 border-l-4 ${getImportanceColor(event.importance)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(event.type)}
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                      </div>
                      <Badge className={`${getTypeColor(event.type)} text-xs`}>
                        {getTypeText(event.type)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(event.startDate)}
                          {event.endDate && ` - ${formatDate(event.endDate)}`}
                        </span>
                      </div>
                      {event.time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {event.target.map((target, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {target}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    {getDaysUntil(event.startDate) && (
                      <Badge 
                        variant={getDaysUntil(event.startDate) === 'D-Day' ? 'destructive' : 'default'}
                        className="text-sm"
                      >
                        {getDaysUntil(event.startDate)}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    캘린더 추가
                  </Button>
                  <Button variant="ghost" size="sm">
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="text-center py-12 shadow-campus">
            <CardContent>
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">해당하는 일정이 없습니다</h3>
              <p className="text-muted-foreground">다른 필터를 시도해보세요.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Scheduler;