import { Bell, MessageSquare, Heart, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: 'report_update' | 'like' | 'comment' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  reportId?: string;
}

const Notifications = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'report_update',
      title: '제보 상태 업데이트',
      description: '김수환관 엘리베이터 고장 제보가 "처리중" 상태로 변경되었습니다.',
      timestamp: '2024-01-15 14:30',
      read: false,
      reportId: '1'
    },
    {
      id: '2',
      type: 'like',
      title: '새로운 공감',
      description: '마리아관 장애인 화장실 문 고장 제보에 3명이 공감했습니다.',
      timestamp: '2024-01-15 12:15',
      read: false,
      reportId: '2'
    },
    {
      id: '3',
      type: 'comment',
      title: '새로운 댓글',
      description: '라파엘관 경사로 개선 요청 제보에 새 댓글이 달렸습니다.',
      timestamp: '2024-01-15 10:45',
      read: true,
      reportId: '3'
    },
    {
      id: '4',
      type: 'system',
      title: '시스템 점검 안내',
      description: '1월 20일 새벽 2시-4시 시스템 정기 점검이 있습니다.',
      timestamp: '2024-01-14 16:00',
      read: true
    },
    {
      id: '5',
      type: 'report_update',
      title: '제보 해결 완료',
      description: '베르나르도관 점자블록 파손 제보가 해결되었습니다.',
      timestamp: '2024-01-14 11:20',
      read: true,
      reportId: '4'
    },
    {
      id: '6',
      type: 'like',
      title: '새로운 공감',
      description: '김수환관 보조공학실 이용 후기에 5명이 공감했습니다.',
      timestamp: '2024-01-13 15:30',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'report_update':
        return <AlertTriangle className="w-5 h-5 text-primary" />;
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'system':
        return <Bell className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationTypeText = (type: string) => {
    switch (type) {
      case 'report_update':
        return '제보 업데이트';
      case 'like':
        return '공감';
      case 'comment':
        return '댓글';
      case 'system':
        return '시스템';
      default:
        return '알림';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-campus">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">알림</h1>
              <p className="text-muted-foreground">
                제보 상태 변경, 댓글, 공감 등의 알림을 확인하세요
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm">
                모두 읽음 처리
              </Button>
            )}
          </div>
          
          {unreadCount > 0 && (
            <div className="mt-4">
              <Badge variant="default" className="text-sm">
                {unreadCount}개의 읽지 않은 알림
              </Badge>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`shadow-campus hover:shadow-elevated transition-all duration-200 cursor-pointer ${
                !notification.read ? 'border-primary border-l-4' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-medium ${
                          !notification.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {getNotificationTypeText(notification.type)}
                        </Badge>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm ${
                      !notification.read ? 'text-foreground' : 'text-muted-foreground'
                    } mb-2`}>
                      {notification.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      
                      {notification.reportId && (
                        <Button variant="ghost" size="sm" className="text-xs">
                          제보 보기
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="text-center py-12 shadow-campus">
            <CardContent>
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">알림이 없습니다</h3>
              <p className="text-muted-foreground">새로운 알림이 있을 때 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        <Card className="mt-8 shadow-campus">
          <CardHeader>
            <CardTitle className="text-lg">알림 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">제보 상태 업데이트</p>
                <p className="text-sm text-muted-foreground">내 제보의 상태가 변경될 때 알림</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">댓글 알림</p>
                <p className="text-sm text-muted-foreground">내 제보에 댓글이 달릴 때 알림</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">공감 알림</p>
                <p className="text-sm text-muted-foreground">내 제보에 공감을 받을 때 알림</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">시스템 알림</p>
                <p className="text-sm text-muted-foreground">시스템 점검, 업데이트 등의 알림</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;