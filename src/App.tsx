import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Screen, Restaurant } from './types';

// Components
import { SplashScreen, LoginScreen, SignUpScreen } from './components/auth/AuthScreens';
import { OnboardingRegion, OnboardingRole, OnboardingPrefs, OnboardingTutorial } from './components/onboarding/OnboardingFlow';
import { HomeScreen } from './components/home/Home';
import { RestaurantDetail } from './components/restaurants/RestaurantDetail';
import { ExploreFeed, EatMatchScreen } from './components/explore/Explore';
import { ProfileScreen } from './components/profile/Profile';
import { BottomNav, FABBottomSheet } from './components/navigation/Navigation';
import { RewardBannerPopup, LuckyWheelScreen, DailyRewardModal } from './components/rewards/RewardModals';
import { FUTChatPanel } from './components/ai/FUTAssistant';
import { ReviewForm, SuccessReviewOverlay } from './components/reviews/ReviewForm';
import { ReviewListScreen } from './components/reviews/ReviewList';
import { ReviewerProfilePopup } from './components/profile/ReviewerProfile';
import { SearchDiscovery } from './components/explore/SearchDiscovery';
import { MapView } from './components/map/MapView';

import { RestaurantListScreen } from './components/restaurants/RestaurantList';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFABMenu, setShowFABMenu] = useState(false);
  const [showRewardBanner, setShowRewardBanner] = useState(false);
  const [showLuckyWheel, setShowLuckyWheel] = useState(false);
  const [showFUTAssistant, setShowFUTAssistant] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showReviewerProfile, setShowReviewerProfile] = useState(false);
  const [showSearchDiscovery, setShowSearchDiscovery] = useState(false);

  useEffect(() => {
    if (currentScreen === 'SPLASH') {
      const timer = setTimeout(() => setCurrentScreen('LOGIN'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Simulate showing daily reward after onboarding
  useEffect(() => {
    if (currentScreen === 'HOME') {
      const timer = setTimeout(() => setShowDailyReward(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    (window as any).onViewAllReviews = () => {
      setCurrentScreen('REVIEW_LIST');
    };
    return () => {
      delete (window as any).onViewAllReviews;
    };
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH': return <SplashScreen />;
      case 'LOGIN': return <LoginScreen onLogin={() => setCurrentScreen('ONBOARDING_REGION')} onSignUp={() => setCurrentScreen('SIGNUP')} />;
      case 'SIGNUP': return <SignUpScreen onBack={() => setCurrentScreen('LOGIN')} onSignUp={() => setCurrentScreen('ONBOARDING_REGION')} />;
      case 'ONBOARDING_REGION': return <OnboardingRegion onNext={() => setCurrentScreen('ONBOARDING_ROLE')} />;
      case 'ONBOARDING_ROLE': return <OnboardingRole onNext={() => setCurrentScreen('ONBOARDING_PREFS')} />;
      case 'ONBOARDING_PREFS': return <OnboardingPrefs onNext={() => setCurrentScreen('ONBOARDING_TUTORIAL')} />;
      case 'ONBOARDING_TUTORIAL': return <OnboardingTutorial onNext={() => setCurrentScreen('HOME')} />;
      case 'HOME': return (
        <HomeScreen 
          onSelectRestaurant={(r) => { setSelectedRestaurant(r); setCurrentScreen('RESTAURANT_DETAIL'); }} 
          onOpenFUT={() => setShowFUTAssistant(true)} 
          onSearch={() => setShowSearchDiscovery(true)}
          onOpenMap={() => setCurrentScreen('MAP')}
        />
      );
      case 'RESTAURANT_LIST': return (
        <RestaurantListScreen 
          query={searchQuery}
          onBack={() => setCurrentScreen('HOME')}
          onSelect={(r) => { setSelectedRestaurant(r); setCurrentScreen('RESTAURANT_DETAIL'); }}
        />
      );
      case 'RESTAURANT_DETAIL': return (
        <RestaurantDetail 
          restaurant={selectedRestaurant!} 
          onBack={() => setCurrentScreen('HOME')} 
          onReview={() => setShowReviewForm(true)} 
          onViewAllReviews={() => setCurrentScreen('REVIEW_LIST')}
        />
      );
      case 'REVIEW_LIST': return (
        <ReviewListScreen
          restaurant={selectedRestaurant!}
          onBack={() => setCurrentScreen('RESTAURANT_DETAIL')}
          onOpenProfile={() => setShowReviewerProfile(true)}
        />
      );
      case 'EXPLORE_FEED': return <ExploreFeed onSwitch={() => setCurrentScreen('EXPLORE_MATCH')} />;
      case 'EXPLORE_MATCH': return <EatMatchScreen onSwitch={() => setCurrentScreen('EXPLORE_FEED')} />;
      case 'PROFILE': return <ProfileScreen onShowRewards={() => setShowLuckyWheel(true)} />;
      case 'MAP': return (
        <MapView 
          onBack={() => setCurrentScreen('HOME')} 
          onSelectRestaurant={(r) => { 
            setSelectedRestaurant(r); 
            setCurrentScreen('RESTAURANT_DETAIL'); 
          }} 
        />
      );
      default: return <HomeScreen onSelectRestaurant={() => {}} onOpenFUT={() => {}} onSearch={() => {}} onOpenMap={() => setCurrentScreen('MAP')} />;
    }
  };

  const showNav = ['HOME', 'EXPLORE_FEED', 'EXPLORE_MATCH', 'PROFILE'].includes(currentScreen);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#E0E0E0]">
      <div className="relative w-[390px] h-[844px] bg-background rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-zinc-900 ring-[24px] ring-zinc-800/10">
        {/* iOS Dynamic Island Placeholder */}
        <div className="absolute top-0 w-full h-11 z-[100] flex items-center justify-center pointer-events-none">
          <div className="w-24 h-6 bg-black rounded-full mt-2" />
        </div>
        
        {/* iOS StatusBar Info */}
        <div className="absolute top-0 w-full h-11 z-[99] flex items-center justify-between px-10 text-black">
          <span className="text-[12px] font-bold">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-5 h-2.5 rounded-sm border border-black/30 bg-black/10" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>

        {/* Global Overlays */}
        <AnimatePresence>
          {showDailyReward && (
            <DailyRewardModal onClose={() => setShowDailyReward(false)} />
          )}
          {showFABMenu && (
            <FABBottomSheet onClose={() => setShowFABMenu(false)} onNavigate={setCurrentScreen} />
          )}
          {showRewardBanner && (
            <RewardBannerPopup onClose={() => setShowRewardBanner(false)} onGoToHub={() => { setShowRewardBanner(false); setShowLuckyWheel(true); }} />
          )}
          {showLuckyWheel && (
            <LuckyWheelScreen onBack={() => setShowLuckyWheel(false)} />
          )}
          {showFUTAssistant && (
            <FUTChatPanel onClose={() => setShowFUTAssistant(false)} />
          )}
          {showReviewForm && (
            <ReviewForm 
              restaurantName={selectedRestaurant?.name || 'Quán ăn'} 
              onClose={() => setShowReviewForm(false)} 
              onSuccess={() => { setShowReviewForm(false); setShowSuccessOverlay(true); }} 
            />
          )}
          {showSuccessOverlay && (
            <SuccessReviewOverlay 
              onClose={() => setShowSuccessOverlay(false)} 
              onShowRewards={() => { setShowSuccessOverlay(false); setShowLuckyWheel(true); }}
            />
          )}
          {showReviewerProfile && (
            <ReviewerProfilePopup onClose={() => setShowReviewerProfile(false)} />
          )}

          {showSearchDiscovery && (
            <SearchDiscovery 
              onBack={() => setShowSearchDiscovery(false)}
              onSelectResult={() => {
                setShowSearchDiscovery(false);
                setCurrentScreen('RESTAURANT_LIST');
              }}
            />
          )}
        </AnimatePresence>

        {showNav && (
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} onShowFAB={() => setShowFABMenu(true)} />
        )}
        
        {/* iOS Home Indicator */}
        <div className="absolute bottom-1.5 w-1/3 h-1.5 bg-black/10 rounded-full left-1/2 -translate-x-1/2 z-[101]" />
      </div>
    </div>
  );
}
