import { useState } from "react";
import { Utensils, Clock, MapPin, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  name: string;
  price: string;
  description?: string;
  spicy?: boolean;
  vegetarian?: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  location: string;
  hours: string;
  phone: string;
  rating: number;
  priceRange: string;
  specialties: string[];
}

interface DailyMenu {
  date: string;
  meals: {
    breakfast?: MenuItem[];
    lunch: MenuItem[];
    dinner: MenuItem[];
  };
}

const Dining = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: '학생식당',
      location: '김수환관 지하1층',
      hours: '08:00-19:00',
      phone: '02-2164-4001',
      rating: 4.2,
      priceRange: '3,000-5,000원',
      specialties: ['한식', '양식', '분식']
    },
    {
      id: '2',
      name: '교직원식당',
      location: '마리아관 2층',
      hours: '11:30-14:00',
      phone: '02-2164-4002',
      rating: 4.5,
      priceRange: '6,000-8,000원',
      specialties: ['한정식', '특선메뉴']
    },
    {
      id: '3',
      name: '카페테리아',
      location: '베르나르도관 1층',
      hours: '09:00-20:00',
      phone: '02-2164-4003',
      rating: 4.0,
      priceRange: '2,000-7,000원',
      specialties: ['커피', '샌드위치', '디저트']
    }
  ];

  const weeklyMenu: DailyMenu[] = [
    {
      date: '2024-01-15 (월)',
      meals: {
        breakfast: [
          { name: '토스트세트', price: '2,500원', description: '식빵, 계란, 햄' },
          { name: '시리얼', price: '2,000원' },
          { name: '우유', price: '1,000원' }
        ],
        lunch: [
          { name: '김치찌개', price: '4,000원', spicy: true },
          { name: '제육볶음', price: '4,500원', spicy: true },
          { name: '된장찌개', price: '3,500원', vegetarian: true },
          { name: '공기밥', price: '1,000원' },
          { name: '김치', price: '무료' }
        ],
        dinner: [
          { name: '불고기', price: '5,000원' },
          { name: '미역국', price: '2,000원' },
          { name: '비빔밥', price: '4,000원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ]
      }
    },
    {
      date: '2024-01-16 (화)',
      meals: {
        breakfast: [
          { name: '샌드위치세트', price: '3,000원' },
          { name: '요거트', price: '1,500원' },
          { name: '과일주스', price: '1,500원' }
        ],
        lunch: [
          { name: '순두부찌개', price: '4,000원', spicy: true },
          { name: '돈까스', price: '5,000원' },
          { name: '콩나물국', price: '2,500원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ],
        dinner: [
          { name: '닭갈비', price: '5,500원', spicy: true },
          { name: '계란찜', price: '2,000원' },
          { name: '버섯볶음', price: '3,000원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ]
      }
    },
    {
      date: '2024-01-17 (수)',
      meals: {
        lunch: [
          { name: '카레라이스', price: '4,500원' },
          { name: '탕수육', price: '6,000원' },
          { name: '미소된장국', price: '2,000원', vegetarian: true },
          { name: '단무지', price: '무료' }
        ],
        dinner: [
          { name: '갈비탕', price: '6,000원' },
          { name: '생선구이', price: '4,500원' },
          { name: '시금치나물', price: '2,000원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ]
      }
    },
    {
      date: '2024-01-18 (목)',
      meals: {
        lunch: [
          { name: '부대찌개', price: '4,500원', spicy: true },
          { name: '치킨까스', price: '5,500원' },
          { name: '두부조림', price: '3,000원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ],
        dinner: [
          { name: '삼겹살구이', price: '6,000원' },
          { name: '된장찌개', price: '2,500원' },
          { name: '콩나물무침', price: '2,000원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ]
      }
    },
    {
      date: '2024-01-19 (금)',
      meals: {
        lunch: [
          { name: '볶음밥', price: '4,000원' },
          { name: '짬뽕', price: '5,000원', spicy: true },
          { name: '야채만두', price: '3,000원', vegetarian: true },
          { name: '단무지', price: '무료' }
        ],
        dinner: [
          { name: '생선까스', price: '5,000원' },
          { name: '김치찌개', price: '3,500원', spicy: true },
          { name: '오이무침', price: '2,000원', vegetarian: true },
          { name: '공기밥', price: '1,000원' }
        ]
      }
    }
  ];

  const todayMenu = weeklyMenu[0]; // 오늘 메뉴 (첫 번째)

  return (
    <div className="min-h-screen bg-gradient-campus">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">학식</h1>
          <p className="text-muted-foreground">오늘의 메뉴와 학내 식당 정보를 확인하세요</p>
        </div>

        {/* Today's Special */}
        <Card className="mb-6 shadow-campus border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-primary" />
              <span>오늘의 메뉴</span>
              <Badge variant="outline">{todayMenu.date}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lunch" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="breakfast">조식</TabsTrigger>
                <TabsTrigger value="lunch">중식</TabsTrigger>
                <TabsTrigger value="dinner">석식</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakfast" className="mt-4">
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {todayMenu.meals.breakfast?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <div>
                        <h4 className="font-medium flex items-center space-x-1">
                          <span>{item.name}</span>
                          {item.spicy && <span className="text-red-500">🌶️</span>}
                          {item.vegetarian && <span className="text-green-500">🥬</span>}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                  )) || <p className="text-muted-foreground">조식 메뉴가 없습니다.</p>}
                </div>
              </TabsContent>
              
              <TabsContent value="lunch" className="mt-4">
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {todayMenu.meals.lunch.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <div>
                        <h4 className="font-medium flex items-center space-x-1">
                          <span>{item.name}</span>
                          {item.spicy && <span className="text-red-500">🌶️</span>}
                          {item.vegetarian && <span className="text-green-500">🥬</span>}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="dinner" className="mt-4">
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {todayMenu.meals.dinner.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                      <div>
                        <h4 className="font-medium flex items-center space-x-1">
                          <span>{item.name}</span>
                          {item.spicy && <span className="text-red-500">🌶️</span>}
                          {item.vegetarian && <span className="text-green-500">🥬</span>}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Weekly Menu */}
        <Card className="mb-6 shadow-campus">
          <CardHeader>
            <CardTitle>주간 메뉴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyMenu.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{day.date}</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-muted-foreground">조식</h4>
                      {day.meals.breakfast ? (
                        <div className="space-y-1">
                          {day.meals.breakfast.map((item, itemIndex) => (
                            <div key={itemIndex} className="text-sm flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-primary">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">운영 안함</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-muted-foreground">중식</h4>
                      <div className="space-y-1">
                        {day.meals.lunch.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm flex justify-between">
                            <span className="flex items-center space-x-1">
                              <span>{item.name}</span>
                              {item.spicy && <span className="text-red-500 text-xs">🌶️</span>}
                              {item.vegetarian && <span className="text-green-500 text-xs">🥬</span>}
                            </span>
                            <span className="text-primary">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-muted-foreground">석식</h4>
                      <div className="space-y-1">
                        {day.meals.dinner.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm flex justify-between">
                            <span className="flex items-center space-x-1">
                              <span>{item.name}</span>
                              {item.spicy && <span className="text-red-500 text-xs">🌶️</span>}
                              {item.vegetarian && <span className="text-green-500 text-xs">🥬</span>}
                            </span>
                            <span className="text-primary">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Information */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="shadow-campus hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{restaurant.name}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{restaurant.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{restaurant.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{restaurant.hours}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>{restaurant.priceRange}</span>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">전문 메뉴</p>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="w-3 h-3 mr-1" />
                  위치 보기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className="mt-6 shadow-campus">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">🌶️</span>
                <span>매운맛</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🥬</span>
                <span>채식 메뉴</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dining;