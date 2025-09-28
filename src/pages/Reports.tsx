import { useState } from "react";
import { MessageSquare, Plus, Filter, Search, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pending' | 'processing' | 'resolved';
  createdAt: string;
  likes: number;
  comments: number;
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const reports: Report[] = [
    {
      id: '1',
      title: '김수환관 엘리베이터 고장',
      description: '3층 엘리베이터가 작동하지 않습니다. 휠체어 이용자들이 불편해하고 있어요.',
      category: '시설',
      location: '김수환관 (K관)',
      status: 'processing',
      createdAt: '2024-01-15',
      likes: 8,
      comments: 3
    },
    {
      id: '2',
      title: '마리아관 장애인 화장실 문 고장',
      description: '자동문이 열리지 않아서 이용에 어려움이 있습니다.',
      category: '접근성',
      location: '마리아관 (M관)',
      status: 'pending',
      createdAt: '2024-01-14',
      likes: 12,
      comments: 5
    },
    {
      id: '3',
      title: '라파엘관 경사로 개선 요청',
      description: '경사가 너무 가파라서 휠체어로 이용하기 어렵습니다.',
      category: '접근성',
      location: '라파엘관 (L관)',
      status: 'resolved',
      createdAt: '2024-01-12',
      likes: 15,
      comments: 8
    },
    {
      id: '4',
      title: '베르나르도관 점자블록 파손',
      description: '입구 점자블록이 떨어져 나갔습니다.',
      category: '안전',
      location: '베르나르도관 (B관)',
      status: 'pending',
      createdAt: '2024-01-13',
      likes: 6,
      comments: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-status-moderate text-white';
      case 'processing':
        return 'bg-primary text-primary-foreground';
      case 'resolved':
        return 'bg-status-good text-white';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '대기중';
      case 'processing':
        return '처리중';
      case 'resolved':
        return '해결됨';
      default:
        return '알 수 없음';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <AlertCircle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-campus">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">제보</h1>
            <p className="text-muted-foreground">캠퍼스 시설 개선을 위한 제보를 확인하고 참여하세요</p>
          </div>
          <Button className="shadow-campus">
            <Plus className="w-4 h-4 mr-2" />
            새 제보 작성
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-campus">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="제목, 내용, 위치로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="시설">시설</SelectItem>
                    <SelectItem value="접근성">접근성</SelectItem>
                    <SelectItem value="안전">안전</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">대기중</SelectItem>
                    <SelectItem value="processing">처리중</SelectItem>
                    <SelectItem value="resolved">해결됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <Card key={report.id} className="shadow-campus hover:shadow-elevated transition-all duration-200 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {report.category}
                  </Badge>
                  <Badge className={`${getStatusColor(report.status)} text-xs`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(report.status)}
                      <span>{getStatusText(report.status)}</span>
                    </div>
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{report.location}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {report.description}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{report.createdAt}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span>👍</span>
                      <span>{report.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{report.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="text-center py-12 shadow-campus">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;