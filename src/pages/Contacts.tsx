import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Search, Building } from "lucide-react";
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

interface Department {
  id: string;
  name: string;
  category: string;
  building: string;
  floor: string;
  phone: string;
  email?: string;
  hours: string;
  services: string[];
  description: string;
}

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const departments: Department[] = [
    {
      id: '1',
      name: '학사지원처',
      category: '학사',
      building: '김수환관',
      floor: '2층',
      phone: '02-2164-4000',
      email: 'academic@catholic.ac.kr',
      hours: '09:00-18:00',
      services: ['수강신청', '학적관리', '성적증명서', '졸업관련'],
      description: '학사 관련 전반적인 업무를 담당합니다.'
    },
    {
      id: '2',
      name: '장애학생지원센터',
      category: '복지',
      building: '마리아관',
      floor: '2층',
      phone: '02-2164-4100',
      email: 'disability@catholic.ac.kr',
      hours: '09:00-18:00',
      services: ['학습지원', '이동지원', '상담', '보조기기 대여'],
      description: '장애학생을 위한 각종 지원 서비스를 제공합니다.'
    },
    {
      id: '3',
      name: '학생상담센터',
      category: '상담',
      building: '라파엘관',
      floor: '3층',
      phone: '02-2164-4200',
      email: 'counseling@catholic.ac.kr',
      hours: '09:00-17:00',
      services: ['개인상담', '집단상담', '심리검사', '위기상담'],
      description: '학생들의 심리적 어려움을 도와드립니다.'
    },
    {
      id: '4',
      name: '국제교육원',
      category: '국제',
      building: '베르나르도관',
      floor: '1층',
      phone: '02-2164-4300',
      email: 'international@catholic.ac.kr',
      hours: '09:00-18:00',
      services: ['교환학생', '어학연수', '외국인학생 지원', '글로벌 프로그램'],
      description: '국제교육 및 외국인 학생 지원을 담당합니다.'
    },
    {
      id: '5',
      name: '취업진로개발원',
      category: '진로',
      building: '김수환관',
      floor: '4층',
      phone: '02-2164-4400',
      email: 'career@catholic.ac.kr',
      hours: '09:00-18:00',
      services: ['취업상담', '진로상담', '인턴십', '취업특강'],
      description: '학생들의 취업과 진로 개발을 지원합니다.'
    },
    {
      id: '6',
      name: '창업지원단',
      category: '창업',
      building: '마리아관',
      floor: '5층',
      phone: '02-2164-4500',
      email: 'startup@catholic.ac.kr',
      hours: '09:00-17:00',
      services: ['창업교육', '창업지원금', '멘토링', '사업화 지원'],
      description: '학생 창업을 위한 종합적인 지원을 제공합니다.'
    },
    {
      id: '7',
      name: '도서관',
      category: '학술',
      building: '라파엘관',
      floor: '1-4층',
      phone: '02-2164-4600',
      email: 'library@catholic.ac.kr',
      hours: '08:00-22:00',
      services: ['도서대출', '열람실', '전자자료', '학습공간'],
      description: '학술정보 서비스와 학습공간을 제공합니다.'
    },
    {
      id: '8',
      name: '보건소',
      category: '보건',
      building: '베르나르도관',
      floor: '지하1층',
      phone: '02-2164-4700',
      email: 'health@catholic.ac.kr',
      hours: '09:00-17:00',
      services: ['응급처치', '건강상담', '예방접종', '건강검진'],
      description: '학생과 교직원의 건강을 관리합니다.'
    },
    {
      id: '9',
      name: '총학생회',
      category: '학생자치',
      building: '김수환관',
      floor: '지하1층',
      phone: '02-2164-4800',
      email: 'student@catholic.ac.kr',
      hours: '10:00-18:00',
      services: ['학생권익', '동아리지원', '행사기획', '학생복지'],
      description: '학생들의 권익 보호와 복지 향상을 위해 활동합니다.'
    },
    {
      id: '10',
      name: '시설관리팀',
      category: '시설',
      building: '마리아관',
      floor: '지하1층',
      phone: '02-2164-4900',
      email: 'facility@catholic.ac.kr',
      hours: '24시간',
      services: ['시설점검', '수리요청', '청소관리', '보안관리'],
      description: '캠퍼스 시설의 관리와 유지보수를 담당합니다.'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '학사': 'bg-blue-500 text-white',
      '복지': 'bg-green-500 text-white',
      '상담': 'bg-purple-500 text-white',
      '국제': 'bg-orange-500 text-white',
      '진로': 'bg-teal-500 text-white',
      '창업': 'bg-red-500 text-white',
      '학술': 'bg-indigo-500 text-white',
      '보건': 'bg-pink-500 text-white',
      '학생자치': 'bg-yellow-600 text-white',
      '시설': 'bg-gray-600 text-white'
    };
    return colors[category] || 'bg-muted';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      '학사': '📚',
      '복지': '🤝',
      '상담': '💬',
      '국제': '🌍',
      '진로': '💼',
      '창업': '🚀',
      '학술': '📖',
      '보건': '🏥',
      '학생자치': '👥',
      '시설': '🔧'
    };
    return icons[category] || '📋';
  };

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || dept.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(departments.map(dept => dept.category)));

  return (
    <div className="min-h-screen bg-gradient-campus">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">부서 연락처</h1>
          <p className="text-muted-foreground">캠퍼스 내 각 부서의 연락처와 담당 업무를 확인하세요</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-campus">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="부서명, 업무내용으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Departments Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="shadow-campus hover:shadow-elevated transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(department.category)}</span>
                    <Badge className={`${getCategoryColor(department.category)} text-xs`}>
                      {department.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{department.name}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <span>{department.building} {department.floor}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {department.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${department.phone}`} className="hover:text-primary transition-colors">
                      {department.phone}
                    </a>
                  </div>
                  
                  {department.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${department.email}`} className="hover:text-primary transition-colors">
                        {department.email}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{department.hours}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">담당 업무</p>
                  <div className="flex flex-wrap gap-1">
                    {department.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <a
                    href={`tel:${department.phone}`}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    전화
                  </a>
                  <a
                    href={`mailto:${department.email}`}
                    className="flex-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    메일
                  </a>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <Card className="text-center py-12 shadow-campus">
            <CardContent>
              <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요.</p>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contacts */}
        <Card className="mt-8 shadow-campus border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">응급 연락처</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <h4 className="font-semibold">경비실</h4>
                <p className="text-2xl font-bold text-primary">4999</p>
                <p className="text-xs text-muted-foreground">24시간 운영</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">보건소</h4>
                <p className="text-2xl font-bold text-primary">4700</p>
                <p className="text-xs text-muted-foreground">응급상황</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">시설관리</h4>
                <p className="text-2xl font-bold text-primary">4900</p>
                <p className="text-xs text-muted-foreground">시설 고장신고</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">상담센터</h4>
                <p className="text-2xl font-bold text-primary">4200</p>
                <p className="text-xs text-muted-foreground">위기상담</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contacts;