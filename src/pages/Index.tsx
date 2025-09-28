import CampusMap from "@/components/CampusMap";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-campus">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            가톨릭대학교 캠퍼스 복지 플랫폼
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            실시간 엘리베이터 상태와 복지시설 정보를 한눈에 확인하세요
          </p>
          <p className="text-sm text-muted-foreground">
            지도를 클릭하여 제보하고, 건물을 선택하여 상세 정보를 확인할 수 있습니다
          </p>
        </div>

        {/* Campus Map */}
        <div className="bg-card rounded-lg shadow-campus p-6">
          <CampusMap />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-card p-4 rounded-lg shadow-campus text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">운영중인 건물</div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-campus text-center">
            <div className="text-2xl font-bold text-status-good">8</div>
            <div className="text-sm text-muted-foreground">총 제보 건수</div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-campus text-center">
            <div className="text-2xl font-bold text-status-moderate">2</div>
            <div className="text-sm text-muted-foreground">처리중인 이슈</div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-campus text-center">
            <div className="text-2xl font-bold text-status-busy">12</div>
            <div className="text-sm text-muted-foreground">복지시설</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
