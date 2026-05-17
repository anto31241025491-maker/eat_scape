export type Screen = 
  | 'SPLASH' 
  | 'LOGIN' 
  | 'SIGNUP' 
  | 'ONBOARDING_REGION' 
  | 'ONBOARDING_ROLE' 
  | 'ONBOARDING_PREFS' 
  | 'ONBOARDING_TUTORIAL'
  | 'HOME' 
  | 'EXPLORE_FEED' 
  | 'EXPLORE_MATCH' 
  | 'RESTAURANT_DETAIL'
  | 'RESTAURANT_LIST'
  | 'REVIEW_LIST'
  | 'PROFILE'
  | 'REWARD_HUB'
  | 'MAP';

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  time: string;
  tags: string[];
  price: string;
  crowd: string;
  isVerified: boolean;
  isHiddenGem?: boolean;
}
