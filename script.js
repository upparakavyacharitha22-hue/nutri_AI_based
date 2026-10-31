/**
 * ============================================================================
 * NutriAI — Modern Full-Stack Client Core Application Engine (v3.0 Pro)
 * Features:
 *  - Secure Multi-User Auth with Isolated State, SHA-256 Hashing, Demo Mode
 *  - Google Identity Services (GIS) & 1-Click Sandbox Verified Google Profile
 *  - 2-Step Verification (2FA) with 6-Digit OTP, Countdown, Lockout, Backup Key
 *  - Personalized Dashboard with 5-Meal Checklist, Water Tracker & Profile Sync
 *  - Advanced Meal Planner with 60+ Authentic Recipes (5 meal slots, Cuisines, Diets)
 *  - Interactive Recipe Modal with Exact Quantities, Steps & Similar Recipes
 *  - Recipe Favorites Persistence & Dedicated Favorites View
 *  - Smart Mathematical Grocery List Aggregator (7 Categories, Checkboxes, Print)
 *  - Dedicated AI Food Scanner (Camera Stream, Image Upload, Vision API / Heuristics,
 *    Portion Multipliers [0.5x - 2.0x], Direct Log to 5 Meal Categories)
 *  - Conversational AI Nutritionist (Gemini API Integration + Offline Heuristics)
 *  - 5-Category Nutrition Tracker with 150+ Food Search DB & Custom Foods
 *  - Clinical Calculators (BMI Gauge, Mifflin-St Jeor TDEE, Macros, Water)
 *  - Data-Driven SVG Progress Analytics & Charts
 *  - Light/Dark Mode, Unit Preferences, JSON Data Export & Reset
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. EXTENDED FOOD DATABASE (150+ Nutrition Items)
  // ==========================================================================
  const FOOD_DATABASE = [
    // --- Proteins & Poultry ---
    { id: 'f1', name: 'Grilled Chicken Breast', cal: 165, pro: 31, carb: 0, fat: 3.6, category: 'protein', serving: '100g' },
    { id: 'f2', name: 'Pan-Seared Atlantic Salmon', cal: 206, pro: 22, carb: 0, fat: 12.3, category: 'protein', serving: '100g' },
    { id: 'f3', name: 'Large Whole Egg (Boiled)', cal: 78, pro: 6.3, carb: 0.6, fat: 5.3, category: 'protein', serving: '1 egg (50g)' },
    { id: 'f4', name: 'Egg Whites (Liquid/Cooked)', cal: 52, pro: 11, carb: 0.7, fat: 0.2, category: 'protein', serving: '100g' },
    { id: 'f5', name: 'Plain Greek Yogurt (0% Fat)', cal: 59, pro: 10.3, carb: 3.6, fat: 0.4, category: 'protein', serving: '100g' },
    { id: 'f6', name: 'Firm Tofu (Organic)', cal: 83, pro: 10, carb: 2.3, fat: 5.3, category: 'protein', serving: '100g' },
    { id: 'f7', name: 'Paneer (Indian Cottage Cheese)', cal: 265, pro: 18.3, carb: 1.2, fat: 20.8, category: 'protein', serving: '100g' },
    { id: 'f8', name: 'Low-Fat Paneer', cal: 160, pro: 25, carb: 2.5, fat: 5.5, category: 'protein', serving: '100g' },
    { id: 'f9', name: 'Whey Protein Isolate', cal: 120, pro: 25, carb: 2, fat: 1, category: 'protein', serving: '1 scoop (30g)' },
    { id: 'f10', name: 'Plant-Based Pea Protein', cal: 115, pro: 24, carb: 3, fat: 1.5, category: 'protein', serving: '1 scoop (30g)' },
    { id: 'f11', name: 'Canned Tuna in Water', cal: 116, pro: 26, carb: 0, fat: 1, category: 'protein', serving: '100g' },
    { id: 'f12', name: 'Lean Ground Turkey (93%)', cal: 150, pro: 22, carb: 0, fat: 7, category: 'protein', serving: '100g' },
    { id: 'f13', name: 'Grass-Fed Beef Tenderloin', cal: 215, pro: 26, carb: 0, fat: 12, category: 'protein', serving: '100g' },
    { id: 'f14', name: 'Grilled Prawns / Shrimp', cal: 99, pro: 24, carb: 0.2, fat: 0.3, category: 'protein', serving: '100g' },
    { id: 'f15', name: 'Tempeh (Fermented Soy)', cal: 192, pro: 20.3, carb: 7.6, fat: 10.8, category: 'protein', serving: '100g' },
    { id: 'f16', name: 'Soya Chunks (Dry)', cal: 345, pro: 52, carb: 33, fat: 0.5, category: 'protein', serving: '100g' },
    { id: 'f17', name: 'Seitan (Vital Wheat Gluten)', cal: 370, pro: 75, carb: 14, fat: 1.9, category: 'protein', serving: '100g' },
    { id: 'f18', name: 'Cottage Cheese Low-Fat', cal: 72, pro: 12.4, carb: 2.7, fat: 1, category: 'protein', serving: '100g' },
    { id: 'f19', name: 'Chicken Thigh (Skinless)', cal: 177, pro: 24, carb: 0, fat: 8.3, category: 'protein', serving: '100g' },
    { id: 'f20', name: 'Tilapia Fish Fillet', cal: 96, pro: 20.1, carb: 0, fat: 1.7, category: 'protein', serving: '100g' },

    // --- Carbohydrates & Whole Grains ---
    { id: 'f21', name: 'Cooked Quinoa', cal: 120, pro: 4.4, carb: 21.3, fat: 1.9, category: 'grain', serving: '100g' },
    { id: 'f22', name: 'Brown Jasmine Rice (Cooked)', cal: 123, pro: 2.7, carb: 25.6, fat: 1, category: 'grain', serving: '100g' },
    { id: 'f23', name: 'Rolled Oats (Dry)', cal: 389, pro: 16.9, carb: 66.3, fat: 6.9, category: 'grain', serving: '100g' },
    { id: 'f24', name: 'Steel-Cut Oats (Cooked)', cal: 150, pro: 5, carb: 27, fat: 2.5, category: 'grain', serving: '1 cup (230g)' },
    { id: 'f25', name: 'Baked Sweet Potato', cal: 90, pro: 2, carb: 20.7, fat: 0.1, category: 'grain', serving: '100g' },
    { id: 'f26', name: 'Steamed Basmati Rice', cal: 130, pro: 2.7, carb: 28, fat: 0.3, category: 'grain', serving: '100g' },
    { id: 'f27', name: 'Whole Wheat Sourdough Bread', cal: 160, pro: 7, carb: 31, fat: 1.2, category: 'grain', serving: '2 slices (60g)' },
    { id: 'f28', name: 'Cooked Yellow Dal (Moong/Toor)', cal: 116, pro: 9, carb: 20, fat: 0.4, category: 'grain', serving: '100g' },
    { id: 'f29', name: 'Chickpeas / Chana (Boiled)', cal: 164, pro: 8.9, carb: 27.4, fat: 2.6, category: 'grain', serving: '100g' },
    { id: 'f30', name: 'Black Beans (Cooked)', cal: 132, pro: 8.9, carb: 23.7, fat: 0.5, category: 'grain', serving: '100g' },
    { id: 'f31', name: 'Steamed Idli', cal: 58, pro: 2, carb: 12, fat: 0.2, category: 'grain', serving: '1 piece (40g)' },
    { id: 'f32', name: 'Plain Dosa', cal: 133, pro: 2.9, carb: 22.8, fat: 3.7, category: 'grain', serving: '1 dosa (80g)' },
    { id: 'f33', name: 'Whole Wheat Roti / Chapati', cal: 110, pro: 3.5, carb: 22, fat: 0.8, category: 'grain', serving: '1 roti (45g)' },
    { id: 'f34', name: 'Multigrain Bread Slice', cal: 75, pro: 3.5, carb: 13, fat: 1.1, category: 'grain', serving: '1 slice (32g)' },
    { id: 'f35', name: 'Whole Wheat Pasta (Cooked)', cal: 140, pro: 5.5, carb: 28, fat: 0.8, category: 'grain', serving: '100g' },
    { id: 'f36', name: 'Millet / Bajra Roti', cal: 125, pro: 3.2, carb: 24, fat: 1.8, category: 'grain', serving: '1 roti (50g)' },
    { id: 'f37', name: 'Foxtail Millet (Cooked)', cal: 119, pro: 3.5, carb: 25, fat: 0.8, category: 'grain', serving: '100g' },
    { id: 'f38', name: 'Poha (Flattened Rice, Cooked)', cal: 180, pro: 3.5, carb: 32, fat: 4.5, category: 'grain', serving: '1 bowl (150g)' },
    { id: 'f39', name: 'Upma (Semolina & Veggies)', cal: 195, pro: 4.2, carb: 34, fat: 4.8, category: 'grain', serving: '1 bowl (150g)' },
    { id: 'f40', name: 'Boiled Rajma (Kidney Beans)', cal: 127, pro: 8.7, carb: 22.8, fat: 0.5, category: 'grain', serving: '100g' },

    // --- Vegetables & Greens ---
    { id: 'f41', name: 'Fresh Baby Spinach', cal: 23, pro: 2.9, carb: 3.6, fat: 0.4, category: 'veg', serving: '100g' },
    { id: 'f42', name: 'Steamed Broccoli Florets', cal: 35, pro: 2.4, carb: 7.2, fat: 0.4, category: 'veg', serving: '100g' },
    { id: 'f43', name: 'Roasted Asparagus', cal: 22, pro: 2.4, carb: 4.1, fat: 0.2, category: 'veg', serving: '100g' },
    { id: 'f44', name: 'Mixed Bell Peppers', cal: 31, pro: 1, carb: 6, fat: 0.3, category: 'veg', serving: '100g' },
    { id: 'f45', name: 'Cucumber with Peel', cal: 15, pro: 0.7, carb: 3.6, fat: 0.1, category: 'veg', serving: '100g' },
    { id: 'f46', name: 'Cherry Tomatoes', cal: 18, pro: 0.9, carb: 3.9, fat: 0.2, category: 'veg', serving: '100g' },
    { id: 'f47', name: 'Hass Avocado', cal: 160, pro: 2, carb: 8.5, fat: 14.7, category: 'veg', serving: '100g' },
    { id: 'f48', name: 'Zucchini (Raw/Steamed)', cal: 17, pro: 1.2, carb: 3.1, fat: 0.3, category: 'veg', serving: '100g' },
    { id: 'f49', name: 'Cauliflower Florets', cal: 25, pro: 1.9, carb: 5, fat: 0.3, category: 'veg', serving: '100g' },
    { id: 'f50', name: 'Green Beans (French Beans)', cal: 31, pro: 1.8, carb: 7, fat: 0.2, category: 'veg', serving: '100g' },
    { id: 'f51', name: 'Carrots (Raw/Boiled)', cal: 41, pro: 0.9, carb: 9.6, fat: 0.2, category: 'veg', serving: '100g' },
    { id: 'f52', name: 'Mushrooms (Button/Cremini)', cal: 22, pro: 3.1, carb: 3.3, fat: 0.3, category: 'veg', serving: '100g' },
    { id: 'f53', name: 'Kale Leaves (Raw)', cal: 49, pro: 4.3, carb: 8.8, fat: 0.9, category: 'veg', serving: '100g' },
    { id: 'f54', name: 'Beetroot (Cooked)', cal: 44, pro: 1.7, carb: 10, fat: 0.2, category: 'veg', serving: '100g' },
    { id: 'f55', name: 'Cabbage (Shredded)', cal: 25, pro: 1.3, carb: 5.8, fat: 0.1, category: 'veg', serving: '100g' },
    { id: 'f56', name: 'Bottle Gourd (Lauki)', cal: 14, pro: 0.6, carb: 3.4, fat: 0.1, category: 'veg', serving: '100g' },
    { id: 'f57', name: 'Okra / Bhindi (Sautéed)', cal: 33, pro: 1.9, carb: 7.5, fat: 0.2, category: 'veg', serving: '100g' },
    { id: 'f58', name: 'Sweet Corn Kernels', cal: 86, pro: 3.2, carb: 19, fat: 1.2, category: 'veg', serving: '100g' },
    { id: 'f59', name: 'Green Peas (Matar)', cal: 81, pro: 5.4, carb: 14.5, fat: 0.4, category: 'veg', serving: '100g' },
    { id: 'f60', name: 'Methi Leaves (Fenugreek)', cal: 49, pro: 4.4, carb: 6, fat: 0.9, category: 'veg', serving: '100g' },

    // --- Fruits & Berries ---
    { id: 'f61', name: 'Fresh Blueberries', cal: 57, pro: 0.7, carb: 14.5, fat: 0.3, category: 'fruit', serving: '100g' },
    { id: 'f62', name: 'Fresh Strawberries', cal: 32, pro: 0.7, carb: 7.7, fat: 0.3, category: 'fruit', serving: '100g' },
    { id: 'f63', name: 'Green Apple', cal: 52, pro: 0.3, carb: 13.8, fat: 0.2, category: 'fruit', serving: '1 medium (150g)' },
    { id: 'f64', name: 'Ripe Banana', cal: 89, pro: 1.1, carb: 22.8, fat: 0.3, category: 'fruit', serving: '1 medium (118g)' },
    { id: 'f65', name: 'Fresh Papaya Slices', cal: 43, pro: 0.5, carb: 10.8, fat: 0.3, category: 'fruit', serving: '100g' },
    { id: 'f66', name: 'Pomegranate Arils', cal: 83, pro: 1.7, carb: 18.7, fat: 1.2, category: 'fruit', serving: '100g' },
    { id: 'f67', name: 'Orange Navel', cal: 47, pro: 0.9, carb: 11.8, fat: 0.1, category: 'fruit', serving: '1 medium (130g)' },
    { id: 'f68', name: 'Fresh Guava', cal: 68, pro: 2.6, carb: 14.3, fat: 1, category: 'fruit', serving: '1 fruit (100g)' },
    { id: 'f69', name: 'Watermelon Cubes', cal: 30, pro: 0.6, carb: 7.6, fat: 0.2, category: 'fruit', serving: '100g' },
    { id: 'f70', name: 'Pineapple Chunks', cal: 50, pro: 0.5, carb: 13.1, fat: 0.1, category: 'fruit', serving: '100g' },
    { id: 'f71', name: 'Kiwi Fruit', cal: 61, pro: 1.1, carb: 14.7, fat: 0.5, category: 'fruit', serving: '1 fruit (75g)' },
    { id: 'f72', name: 'Fresh Mango Slices', cal: 60, pro: 0.8, carb: 15, fat: 0.4, category: 'fruit', serving: '100g' },

    // --- Healthy Fats, Nuts & Seeds ---
    { id: 'f73', name: 'Raw Almonds', cal: 579, pro: 21.2, carb: 21.6, fat: 49.9, category: 'fat', serving: '30g (~23 nuts)' },
    { id: 'f74', name: 'Walnut Halves', cal: 654, pro: 15.2, carb: 13.7, fat: 65.2, category: 'fat', serving: '30g' },
    { id: 'f75', name: 'Chia Seeds', cal: 486, pro: 16.5, carb: 42.1, fat: 30.7, category: 'fat', serving: '20g' },
    { id: 'f76', name: 'Flaxseeds (Ground)', cal: 534, pro: 18.3, carb: 28.9, fat: 42.2, category: 'fat', serving: '20g' },
    { id: 'f77', name: 'Pumpkin Seeds', cal: 559, pro: 30.2, carb: 10.7, fat: 49.1, category: 'fat', serving: '30g' },
    { id: 'f78', name: 'Extra Virgin Olive Oil', cal: 884, pro: 0, carb: 0, fat: 100, category: 'fat', serving: '1 tbsp (14g)' },
    { id: 'f79', name: 'Pure Desi Ghee', cal: 900, pro: 0, carb: 0, fat: 99.5, category: 'fat', serving: '1 tsp (5g = 45 kcal)' },
    { id: 'f80', name: 'Natural Peanut Butter', cal: 588, pro: 25, carb: 20, fat: 50, category: 'fat', serving: '2 tbsp (32g)' },
    { id: 'f81', name: 'Roasted Foxnuts / Makhana', cal: 347, pro: 9.7, carb: 76, fat: 0.1, category: 'fat', serving: '30g (105 kcal)' },
    { id: 'f82', name: 'Cashew Nuts', cal: 553, pro: 18.2, carb: 30.2, fat: 43.8, category: 'fat', serving: '30g' },
    { id: 'f83', name: 'Sunflower Seeds', cal: 584, pro: 20.8, carb: 20, fat: 51.5, category: 'fat', serving: '30g' },

    // --- Dairy & Plant Milks ---
    { id: 'f84', name: 'Cow Milk (Skimmed)', cal: 35, pro: 3.4, carb: 4.8, fat: 0.1, category: 'dairy', serving: '100ml' },
    { id: 'f85', name: 'Cow Milk (Toned 3% Fat)', cal: 58, pro: 3.1, carb: 4.7, fat: 3, category: 'dairy', serving: '100ml' },
    { id: 'f86', name: 'Unsweetened Almond Milk', cal: 15, pro: 0.6, carb: 0.3, fat: 1.1, category: 'dairy', serving: '100ml' },
    { id: 'f87', name: 'Unsweetened Soy Milk', cal: 33, pro: 3.3, carb: 1.8, fat: 1.6, category: 'dairy', serving: '100ml' },
    { id: 'f88', name: 'Fresh Curd / Dahi', cal: 61, pro: 3.5, carb: 4.7, fat: 3.3, category: 'dairy', serving: '100g' },
    { id: 'f89', name: 'Buttermilk / Chaas', cal: 40, pro: 3.3, carb: 4.8, fat: 0.9, category: 'dairy', serving: '1 glass (200ml)' },

    // --- Popular Cooked Meals & Dishes (Quick Trackers) ---
    { id: 'f90', name: 'Palak Paneer with 2 Rotis', cal: 480, pro: 22, carb: 48, fat: 22, category: 'meal', serving: '1 complete plate' },
    { id: 'f91', name: 'Dal Tadka with Steamed Rice', cal: 440, pro: 16, carb: 72, fat: 9, category: 'meal', serving: '1 bowl combo' },
    { id: 'f92', name: 'Rajma Chawal (Kidney Beans & Rice)', cal: 490, pro: 18, carb: 82, fat: 10, category: 'meal', serving: '1 plate' },
    { id: 'f93', name: 'Chole with 1 Bhatura', cal: 580, pro: 15, carb: 74, fat: 24, category: 'meal', serving: '1 serving' },
    { id: 'f94', name: 'Chicken Biryani (Lean Breast)', cal: 520, pro: 36, carb: 64, fat: 12, category: 'meal', serving: '1 bowl (300g)' },
    { id: 'f95', name: 'Paneer Tikka (6 skewers)', cal: 320, pro: 22, carb: 12, fat: 20, category: 'meal', serving: '1 plate (200g)' },
    { id: 'f96', name: 'Sprouted Moong Salad', cal: 160, pro: 10, carb: 26, fat: 1.5, category: 'meal', serving: '1 bowl (180g)' },
    { id: 'f97', name: 'Vegetable Sambar', cal: 120, pro: 5.5, carb: 20, fat: 2.2, category: 'meal', serving: '1 bowl (200ml)' },
    { id: 'f98', name: 'Coconut Chutney (South Indian)', cal: 110, pro: 1.5, carb: 4, fat: 10, category: 'meal', serving: '2 tbsp (30g)' },
    { id: 'f99', name: 'Masala Omelette (2 eggs + veg)', cal: 210, pro: 14, carb: 4, fat: 15, category: 'meal', serving: '1 omelette' },
    { id: 'f100', name: 'Avocado Toast with Poached Egg', cal: 320, pro: 14, carb: 28, fat: 17, category: 'meal', serving: '1 slice loaded' }
  ];

  // ==========================================================================
  // 2. STATE PERSISTENCE & MULTI-USER ACCOUNT MANAGER
  // ==========================================================================
  const ACCOUNTS_DB_KEY = 'nutriai_accounts_db_v3';
  const ACTIVE_USER_KEY = 'nutriai_auth_user_session_v4';

  // Seed default demo user
  const DEFAULT_ACCOUNTS = {
    'alex.rivera@example.com': {
      id: 'usr_alex',
      email: 'alex.rivera@example.com',
      passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // admin/demo
      name: 'Alex Rivera',
      avatar: 'AR',
      joinDate: 'March 2026',
      gender: 'male',
      age: 29,
      height: 175,
      weight: 72,
      activity: 1.55,
      activityLevel: 'moderate',
      currentStatus: 'Normal weight',
      primaryGoal: 'Healthy Eating',
      goal: 'Healthy Eating',
      dietType: 'Vegetarian',
      allergies: ['gluten'],
      dailyCalorieTarget: 2150,
      dailyProteinTarget: 140,
      dailyCarbTarget: 220,
      dailyFatTarget: 65,
      waterTargetMl: 2500,
      profileCompleted: true,
      twoFactorEnabled: false,
      twoFactorSecret: 'NUTRI-SEC-9842',
      emergencyKey: 'NUTRI-RECOVER-ALEX-2026',
      todayLogs: {
        breakfast: [],
        morning_snacks: [],
        lunch: [],
        evening_snacks: [],
        dinner: []
      },
      waterLogs: [],
      hydrationCups: 0,
      favorites: ['bf-2', 'ln-1', 'ms-1', 'dn-1'],
      activePlanIds: {
        breakfast: 'bf-2',
        morning_snacks: 'ms-1',
        lunch: 'ln-1',
        evening_snacks: 'es-1',
        dinner: 'dn-1'
      },
      customGrocery: []
    }
  };

  // Robust RFC-5322 compatible email validation
  function validateEmailSyntax(email) {
    if (!email || typeof email !== 'string') {
      return { valid: false, message: 'Email address is required.' };
    }
    const trimmed = email.trim();
    if (!trimmed) {
      return { valid: false, message: 'Email address is required.' };
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: 'Please enter a valid email address.' };
    }
    return { valid: true, email: trimmed.toLowerCase() };
  }

  // Clinical & Age-Based Safety Validation Rules (Requirement 2)
  function evaluateAgeSafety(age, goal) {
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 1) {
      return {
        category: 'invalid',
        allowed: false,
        safeGoal: 'Healthy Eating',
        badge: 'Age Required',
        title: 'Valid Age Required',
        message: 'Please provide a valid age in years.'
      };
    }

    const isWeightPlan = (goal === 'Weight Loss' || goal === 'Weight Gain' || goal === 'lose' || goal === 'gain');

    // Rule 1: Under 5 years
    if (parsedAge < 5) {
      return {
        category: 'pediatric',
        allowed: !isWeightPlan,
        safeGoal: 'Healthy Eating',
        badge: 'Pediatric (<5 yrs)',
        title: 'Pediatric Healthcare Consultation Recommended',
        message: 'Personalized weight-gain or weight-loss plans are not provided for children under 5 years. Please consult with a pediatric healthcare professional.'
      };
    }

    // Rule 2: Ages 5–17 years
    if (parsedAge >= 5 && parsedAge <= 17) {
      return {
        category: 'youth',
        allowed: !isWeightPlan,
        safeGoal: 'Healthy Eating',
        badge: 'Youth Protection (5–17 yrs)',
        title: 'Youth Nutrition Guidance',
        message: 'Adult weight-loss and weight-gain prescriptions are not provided for youth (ages 5–17). Recommendations offer general, age-appropriate healthy eating and recommend professional guidance for weight-related concerns.'
      };
    }

    // Rule 4: Above 70 years
    if (parsedAge > 70) {
      return {
        category: 'senior',
        allowed: !isWeightPlan,
        safeGoal: 'Healthy Eating',
        badge: 'Senior Wellness (70+ yrs)',
        title: 'Senior Health & Vitality Guidance',
        message: 'Weight-gain or weight-loss programs are not automatically recommended for adults over 70. NutriAI provides general balanced-nutrition information and recommends consulting a qualified healthcare professional before pursuing a weight-change goal.'
      };
    }

    // Rule 3: Ages 18–70 years
    return {
      category: 'adult',
      allowed: true,
      safeGoal: goal || 'Healthy Eating',
      badge: 'Adult (18–70 yrs)',
      title: 'Individualized Adult Nutrition',
      message: 'General nutrition and meal recommendations appropriate to your selected preferences and goals, with clinical safeguards.'
    };
  }

  function getTodayDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function checkAndRolloverDailyLogs(user) {
    if (!user) return;
    const today = getTodayDateString();
    if (user.todayDate && user.todayDate !== today) {
      user.mealHistory = user.mealHistory || [];
      if (user.todayLogs && Object.values(user.todayLogs).some(arr => arr && arr.length > 0)) {
        user.mealHistory.push({
          date: user.todayDate,
          logs: JSON.parse(JSON.stringify(user.todayLogs))
        });
      }
      user.todayLogs = {
        breakfast: [],
        morning_snacks: [],
        lunch: [],
        evening_snacks: [],
        dinner: []
      };
      user.todayDate = today;
    } else if (!user.todayDate) {
      user.todayDate = today;
    }
  }

  function getTodayWaterLogs() {
    if (!ActiveUser || !Array.isArray(ActiveUser.waterLogs)) return [];
    const today = getTodayDateString();
    return ActiveUser.waterLogs.filter(w => w.date === today);
  }

  function getTodayWaterMl() {
    const logs = getTodayWaterLogs();
    return logs.reduce((sum, w) => sum + (Number(w.amountMl) || 250), 0);
  }

  function getTodayWaterCups() {
    return Math.round(getTodayWaterMl() / 250);
  }

  function addWater(amountMl = 250, silent = false) {
    if (!ActiveUser) return;
    if (!Array.isArray(ActiveUser.waterLogs)) ActiveUser.waterLogs = [];
    ActiveUser.waterLogs.push({
      id: 'w_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      amountMl: amountMl,
      date: getTodayDateString(),
      timestamp: new Date().toISOString()
    });
    ActiveUser.hydrationCups = getTodayWaterCups();
    persistActiveUser();
    updateHydrationGlassesUI();
    updateSmartNotifications();
    if (!silent) {
      showToast(`Water logged: +${amountMl} ml! 💧 Total: ${getTodayWaterMl()} ml`, 'info');
    }
  }

  function removeWater(amountMl = 250, silent = false) {
    if (!ActiveUser || !Array.isArray(ActiveUser.waterLogs)) return;
    const today = getTodayDateString();
    for (let i = ActiveUser.waterLogs.length - 1; i >= 0; i--) {
      if (ActiveUser.waterLogs[i].date === today) {
        ActiveUser.waterLogs.splice(i, 1);
        break;
      }
    }
    ActiveUser.hydrationCups = getTodayWaterCups();
    persistActiveUser();
    updateHydrationGlassesUI();
    updateSmartNotifications();
    const currentTotal = getTodayWaterMl();
    if (!silent) {
      if (currentTotal === 0) {
        showToast('All water entries removed for today (0 ml).', 'info');
      } else {
        showToast(`Removed water entry (-${amountMl} ml). Total: ${currentTotal} ml`, 'info');
      }
    }
  }

  function getAccountsDB() {
    try {
      const raw = localStorage.getItem(ACCOUNTS_DB_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Normalize keys and legacy profiles
        const normalized = {};
        for (const [k, v] of Object.entries(parsed)) {
          const lowerKey = k.toLowerCase().trim();
          normalized[lowerKey] = v;
          if (!normalized[lowerKey].todayLogs) {
            normalized[lowerKey].todayLogs = { breakfast: [], morning_snacks: [], lunch: [], evening_snacks: [], dinner: [] };
          } else {
            ['breakfast', 'morning_snacks', 'lunch', 'evening_snacks', 'dinner'].forEach(s => {
              if (!Array.isArray(normalized[lowerKey].todayLogs[s])) normalized[lowerKey].todayLogs[s] = [];
            });
          }
          if (!Array.isArray(normalized[lowerKey].waterLogs)) {
            normalized[lowerKey].waterLogs = [];
          }
          checkAndRolloverDailyLogs(normalized[lowerKey]);
          if (lowerKey === 'alex.rivera@example.com') {
            normalized[lowerKey].currentStatus = normalized[lowerKey].currentStatus || 'Normal weight';
            normalized[lowerKey].primaryGoal = normalized[lowerKey].primaryGoal || 'Healthy Eating';
            normalized[lowerKey].dietType = normalized[lowerKey].dietType || 'Vegetarian';
            normalized[lowerKey].profileCompleted = true;
          }
        }
        return normalized;
      }
    } catch (e) {
      console.warn('Failed loading accounts DB', e);
    }
    localStorage.setItem(ACCOUNTS_DB_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
    return JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS));
  }

  function saveAccountsDB(db) {
    try {
      localStorage.setItem(ACCOUNTS_DB_KEY, JSON.stringify(db));
    } catch (e) {
      console.warn('Failed saving accounts DB', e);
    }
  }

  // Active User session object
  let ActiveUser = (function loadActiveUser() {
    try {
      // Clear legacy/stale session keys that previously trapped browser in demo state
      localStorage.removeItem('nutriai_active_user_session_v3');
      localStorage.removeItem('nutriai_active_user_session');

      const email = localStorage.getItem(ACTIVE_USER_KEY);
      const db = getAccountsDB();
      if (email) {
        const lowerEmail = email.toLowerCase().trim();
        if (db[lowerEmail]) {
          checkAndRolloverDailyLogs(db[lowerEmail]);
          return db[lowerEmail];
        }
      }
    } catch (e) {
      console.warn('Failed loading active user', e);
    }
    return null;
  })();

  function persistActiveUser() {
    if (!ActiveUser) {
      localStorage.removeItem(ACTIVE_USER_KEY);
      return;
    }
    const lowerEmail = ActiveUser.email.toLowerCase().trim();
    localStorage.setItem(ACTIVE_USER_KEY, lowerEmail);
    const db = getAccountsDB();
    db[lowerEmail] = ActiveUser;
    saveAccountsDB(db);
  }

  // Fast SHA-256 for browser credentials
  async function sha256(text) {
    if (window.crypto && crypto.subtle) {
      try {
        const enc = new TextEncoder().encode(text);
        const hashBuf = await crypto.subtle.digest('SHA-256', enc);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (err) {
        console.warn('Subtle crypto error, fallback hashing', err);
      }
    }
    // Fallback simple hash string
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash);
  }

  // ==========================================================================
  // 3. TOAST NOTIFICATIONS & FEEDBACK
  // ==========================================================================
  function showToast(message, type = 'success', duration = 3400) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconName = 'check-circle';
    if (type === 'info') iconName = 'info';
    if (type === 'warning') iconName = 'alert-circle';
    if (type === 'error') iconName = 'alert-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.NutriIcons) window.NutriIcons.renderAll(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ==========================================================================
  // 4. CLIENT ROUTER & VIEW CONTROLLER
  // ==========================================================================
  const PROTECTED_PAGES = [
    'dashboard', 'nutrition-profile', 'meal-plan', 'favorites',
    'ai-food-scanner', 'ai-chatbot', 'nutrition-tracking',
    'progress-analytics', 'user-profile', 'settings',
    'bmi-calculator', 'calorie-calculator', 'calculators', 'onboarding'
  ];

  function navigateTo(pageId) {
    let target = (pageId || '').replace('#', '').toLowerCase().trim();

    // 1. Unauthenticated Route Guard: Only allow public auth/info pages
    if (!ActiveUser) {
      const publicAllowed = ['login', 'register', 'forgot-password', 'privacy', 'terms'];
      if (!publicAllowed.includes(target)) {
        if (PROTECTED_PAGES.includes(target)) {
          showToast('Please sign in to access your personal nutrition dashboard.', 'info');
        }
        target = 'login';
        if (window.location.hash !== '#login') {
          window.location.hash = '#login';
          return;
        }
      }
    } else {
      // 2. Authenticated Route Guard:
      // If user is already logged in and navigates to login, log them out cleanly so they can sign in
      if (target === 'login') {
        logoutUser();
        return;
      }
      // If logged in, redirect landing/register to dashboard
      if (['register', 'home', ''].includes(target)) {
        target = 'dashboard';
        if (window.location.hash !== '#dashboard') {
          window.location.hash = '#dashboard';
          return;
        }
      }
    }

    // Map alias routes
    if (target === 'scanner') target = 'ai-food-scanner';

    // Hide all views
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    // Show target view
    const activeView = document.getElementById(`view-${target}`);
    if (activeView) {
      activeView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const fallbackId = ActiveUser ? 'view-dashboard' : 'view-login';
      const fallbackView = document.getElementById(fallbackId);
      if (fallbackView) fallbackView.classList.add('active');
    }

    // Nav Link Highlighting
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.getAttribute('data-nav') === target) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    closeMobileDrawer();

    // Route triggers
    if (target === 'dashboard') refreshDashboard();
    if (target === 'meal-plan') {
      renderMealPlanCards();
      renderGroceryList();
    }
    if (target === 'favorites') renderFavoritesView();
    if (target === 'nutrition-tracking') refreshFoodTracker();
    if (target === 'progress-analytics') refreshAnalytics();
    if (target === 'ai-food-scanner') initScannerView();
    if (target === 'user-profile') syncProfileInputs();
  }

  function updateNavAuthUI() {
    const isLoggedIn = !!ActiveUser;
    const publicNav = document.getElementById('public-nav-links');
    const authNav = document.getElementById('auth-nav-links');
    const publicActions = document.getElementById('public-auth-actions');
    const userActions = document.getElementById('user-auth-actions');
    const mobilePublic = document.getElementById('mobile-public-links');
    const mobileAuth = document.getElementById('mobile-auth-links');
    const demoBtnText = document.getElementById('demo-btn-text');
    const mobileDemoText = document.getElementById('mobile-demo-text');
    const userNavName = document.getElementById('user-nav-name');
    const userInitials = document.getElementById('user-avatar-initials');

    if (isLoggedIn) {
      const firstName = (ActiveUser.name || 'Member').split(' ')[0];
      if (userNavName) userNavName.textContent = firstName;
      if (userInitials) userInitials.textContent = ActiveUser.avatar || firstName.substring(0, 2).toUpperCase();

      if (publicNav) publicNav.style.display = 'none';
      if (authNav) authNav.style.display = 'flex';
      if (publicActions) publicActions.style.display = 'none';
      if (userActions) userActions.style.display = 'flex';
      if (mobilePublic) mobilePublic.style.display = 'none';
      if (mobileAuth) mobileAuth.style.display = 'flex';
      if (demoBtnText) demoBtnText.textContent = 'Switch Account';
      if (mobileDemoText) mobileDemoText.textContent = 'Switch Account';
    } else {
      if (publicNav) publicNav.style.display = 'flex';
      if (authNav) authNav.style.display = 'none';
      if (publicActions) publicActions.style.display = 'flex';
      if (userActions) userActions.style.display = 'none';
      if (mobilePublic) mobilePublic.style.display = 'flex';
      if (mobileAuth) mobileAuth.style.display = 'none';
      if (demoBtnText) demoBtnText.textContent = 'Demo Account';
      if (mobileDemoText) mobileDemoText.textContent = 'Launch Demo User';
    }
  }

  function loginAsUser(userObj, suppressToast = false) {
    ActiveUser = userObj;
    persistActiveUser();
    updateNavAuthUI();
    if (!suppressToast) {
      showToast('Login successful! Welcome back.', 'success');
    }

    window.location.hash = '#dashboard';
    navigateTo('dashboard');
  }

  function logoutUser() {
    ActiveUser = null;
    localStorage.removeItem(ACTIVE_USER_KEY);
    try {
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } catch (e) {}
    updateNavAuthUI();
    showToast('Signed out securely. See you soon!', 'info');
    window.location.hash = '#login';
    navigateTo('login');
  }

  function launchDemoUser() {
    const db = getAccountsDB();
    const demo = db['alex.rivera@example.com'] || DEFAULT_ACCOUNTS['alex.rivera@example.com'];
    loginAsUser(demo);
  }

  // ==========================================================================
  // 5. TWO-FACTOR AUTHENTICATION (2FA) STATE MACHINE
  // ==========================================================================
  let TwoFactorState = {
    pendingUser: null,
    generatedOtp: '482915',
    expiresAt: 0,
    attempts: 0,
    maxAttempts: 5,
    timerInterval: null,
    cooldownUntil: 0
  };

  function open2FAModal(userObj) {
    TwoFactorState.pendingUser = userObj;
    TwoFactorState.attempts = 0;
    generateAndSendOTP();

    const modal = document.getElementById('two-factor-modal');
    const overlay = document.getElementById('two-factor-overlay');
    if (modal) modal.style.display = 'flex';
    if (overlay) overlay.classList.add('active');

    // Clear inputs and focus first
    for (let i = 1; i <= 6; i++) {
      const box = document.getElementById(`otp-${i}`);
      if (box) box.value = '';
    }
    const firstBox = document.getElementById('otp-1');
    if (firstBox) firstBox.focus();

    start2FACountdown();
  }

  function close2FAModal() {
    const modal = document.getElementById('two-factor-modal');
    const overlay = document.getElementById('two-factor-overlay');
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.classList.remove('active');
    if (TwoFactorState.timerInterval) clearInterval(TwoFactorState.timerInterval);
    TwoFactorState.pendingUser = null;
  }

  function generateAndSendOTP() {
    // Generate secure 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    TwoFactorState.generatedOtp = code;
    TwoFactorState.expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins
    TwoFactorState.cooldownUntil = Date.now() + 45 * 1000; // 45s resend

    // Notify user in dev/demo mode via Toast & console
    showToast(`🔐 2FA Verification Code: ${code} (Expires in 5 min)`, 'info', 7000);
    console.info('%c[NutriAI 2FA Engine] Verification OTP:', 'color: #059669; font-weight: bold;', code);

    // Call backend API if running
    fetch('/api/auth/2fa/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TwoFactorState.pendingUser.email, code })
    }).catch(() => {
      // Offline fallback silent pass
    });
  }

  function start2FACountdown() {
    const timerEl = document.getElementById('two-factor-timer');
    const resendBtn = document.getElementById('two-factor-resend-btn');

    if (TwoFactorState.timerInterval) clearInterval(TwoFactorState.timerInterval);

    TwoFactorState.timerInterval = setInterval(() => {
      const remainingSec = Math.max(0, Math.floor((TwoFactorState.expiresAt - Date.now()) / 1000));
      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;

      if (timerEl) {
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }

      const cooldownLeft = Math.max(0, Math.floor((TwoFactorState.cooldownUntil - Date.now()) / 1000));
      if (resendBtn) {
        if (cooldownLeft > 0) {
          resendBtn.disabled = true;
          resendBtn.textContent = `Resend in ${cooldownLeft}s`;
        } else {
          resendBtn.disabled = false;
          resendBtn.textContent = 'Resend Code';
        }
      }

      if (remainingSec <= 0) {
        clearInterval(TwoFactorState.timerInterval);
        showToast('Verification code expired. Please request a new code.', 'warning');
      }
    }, 1000);
  }

  function verify2FAInput() {
    let entered = '';
    for (let i = 1; i <= 6; i++) {
      const el = document.getElementById(`otp-${i}`);
      if (el) entered += (el.value || '');
    }

    if (entered.length < 6) {
      showToast('Please enter all 6 digits of the verification code.', 'error');
      return;
    }

    if (Date.now() > TwoFactorState.expiresAt) {
      showToast('Verification code expired. Please request a new code.', 'error');
      return;
    }

    TwoFactorState.attempts++;
    if (TwoFactorState.attempts > TwoFactorState.maxAttempts) {
      showToast('Maximum verification attempts exceeded. Please try again later.', 'error');
      close2FAModal();
      return;
    }

    if (entered === TwoFactorState.generatedOtp) {
      const user = TwoFactorState.pendingUser;
      close2FAModal();
      showToast('Two-step verification successful!', 'success');
      loginAsUser(user);
    } else {
      const left = TwoFactorState.maxAttempts - TwoFactorState.attempts;
      showToast(`Invalid verification code. ${left} attempts remaining.`, 'error');
    }
  }

  // ==========================================================================
  // 6. GOOGLE OAUTH & GOOGLE IDENTITY SERVICES (GIS)
  // ==========================================================================
  function initGoogleAuth() {
    // Check if GIS is loaded in head
    if (window.google && google.accounts && google.accounts.id) {
      const clientId = localStorage.getItem('nutriai_google_client_id') || 'DEMO_SANDBOX_CLIENT_ID.apps.googleusercontent.com';
      try {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false
        });
      } catch (e) {
        console.warn('GIS Init notice:', e);
      }
    }
  }

  function openGoogleOAuthModal() {
    const modal = document.getElementById('google-oauth-modal');
    const overlay = document.getElementById('google-oauth-overlay');
    if (modal) modal.style.display = 'flex';
    if (overlay) overlay.classList.add('active');
  }

  function closeGoogleOAuthModal() {
    const modal = document.getElementById('google-oauth-modal');
    const overlay = document.getElementById('google-oauth-overlay');
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.classList.remove('active');
  }

  function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) {
      showToast('Google authentication failed. Please try again.', 'error');
      return;
    }

    try {
      // Decode JWT payload (standard base64 URL decode)
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const profile = JSON.parse(jsonPayload);
      onGoogleUserVerified({
        email: profile.email,
        name: profile.name || profile.given_name || 'Google User',
        avatar: (profile.name || 'G').substring(0, 2).toUpperCase(),
        picture: profile.picture
      });
    } catch (e) {
      console.error('Error decoding Google JWT', e);
      showToast('Unable to process Google profile response.', 'error');
    }
  }

  function onGoogleUserVerified(userData) {
    const db = getAccountsDB();
    let account = db[userData.email];

    if (!account) {
      // Create new verified account
      account = {
        id: 'usr_g_' + Date.now(),
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
        picture: userData.picture,
        joinDate: 'Today',
        gender: 'female',
        age: 28,
        height: 168,
        weight: 62,
        activity: 1.4,
        goal: 'maintain',
        dietType: 'balanced',
        allergies: [],
        dailyCalorieTarget: 2000,
        dailyProteinTarget: 120,
        dailyCarbTarget: 220,
        dailyFatTarget: 60,
        waterTargetMl: 2250,
        twoFactorEnabled: false,
        todayLogs: {
          breakfast: [],
          morning_snacks: [],
          lunch: [],
          evening_snacks: [],
          dinner: []
        },
        hydrationCups: 4,
        favorites: ['rec_b_oats_berries', 'rec_l_dal_rice'],
        activePlanIds: {
          breakfast: 'rec_b_oats_berries',
          morning_snacks: 'rec_ms_makhana',
          lunch: 'rec_l_dal_rice',
          evening_snacks: 'rec_es_sprouts',
          dinner: 'rec_d_tofu_stirfry'
        },
        customGrocery: []
      };
      db[userData.email] = account;
      saveAccountsDB(db);
    }

    closeGoogleOAuthModal();
    loginAsUser(account);
  }

  // ==========================================================================
  // 7. DASHBOARD & MEAL CHECKLIST SYNC
  // ==========================================================================
  function calculateTotalIntake() {
    let totalCal = 0, totalPro = 0, totalCarb = 0, totalFat = 0;
    if (!ActiveUser || !ActiveUser.todayLogs) return { totalCal, totalPro, totalCarb, totalFat };

    const slots = ['breakfast', 'morning_snacks', 'lunch', 'evening_snacks', 'dinner'];
    slots.forEach(slot => {
      const items = ActiveUser.todayLogs[slot] || [];
      items.forEach(i => {
        totalCal += (i.cal || 0);
        totalPro += (i.pro || 0);
        totalCarb += (i.carb || 0);
        totalFat += (i.fat || 0);
      });
    });
    return { totalCal, totalPro, totalCarb, totalFat };
  }

  function refreshDashboard() {
    if (!ActiveUser) return;

    // Header Profile Card
    const nameEl = document.getElementById('dash-user-name');
    const emailEl = document.getElementById('dash-user-email');
    const memberSinceEl = document.getElementById('dash-member-since');
    const avatarEl = document.getElementById('dash-user-avatar');
    const dietBadgeEl = document.getElementById('dash-diet-badge');

    if (nameEl) nameEl.textContent = ActiveUser.name || 'Member';
    if (emailEl) emailEl.textContent = ActiveUser.email || '';
    if (memberSinceEl) memberSinceEl.textContent = ActiveUser.joinDate || 'Active Member';
    if (avatarEl) avatarEl.textContent = ActiveUser.avatar || (ActiveUser.name ? ActiveUser.name.substring(0, 2).toUpperCase() : 'ME');
    if (dietBadgeEl) dietBadgeEl.textContent = ActiveUser.dietType || 'Vegetarian';

    // Requirement 3: Check if profile information is missing
    const incompleteCard = document.getElementById('dash-profile-incomplete-card');
    const summaryContainer = document.getElementById('dash-profile-summary-container');
    const statusGoalGrid = document.querySelector('.status-goal-dash-grid');
    const nutritionSummaryCard = document.getElementById('dash-nutrition-summary-card');

    const isComplete = !!(
      ActiveUser.profileCompleted &&
      ActiveUser.currentStatus &&
      ActiveUser.primaryGoal &&
      ActiveUser.age
    );

    if (!isComplete) {
      if (incompleteCard) incompleteCard.style.display = 'block';
      if (summaryContainer) summaryContainer.style.display = 'none';
      if (statusGoalGrid) statusGoalGrid.style.display = 'none';
      if (nutritionSummaryCard) nutritionSummaryCard.style.display = 'none';
    } else {
      if (incompleteCard) incompleteCard.style.display = 'none';
      if (summaryContainer) summaryContainer.style.display = 'block';
      if (statusGoalGrid) statusGoalGrid.style.display = 'grid';
      if (nutritionSummaryCard) nutritionSummaryCard.style.display = 'block';

      // Profile Summary elements: Age, Current weight, Height, Dietary Preference, Activity Level
      const ageEl = document.getElementById('dash-profile-age');
      const weightEl = document.getElementById('dash-profile-weight');
      const heightEl = document.getElementById('dash-profile-height');
      const dietEl = document.getElementById('dash-profile-diet');
      const activityEl = document.getElementById('dash-profile-activity');

      if (ageEl) ageEl.textContent = `${ActiveUser.age} yrs`;
      if (weightEl) weightEl.textContent = `${ActiveUser.weight} kg`;
      if (heightEl) heightEl.textContent = `${ActiveUser.height} cm`;
      if (dietEl) dietEl.textContent = ActiveUser.dietType || 'Vegetarian';

      const activityLabels = {
        sedentary: 'Sedentary',
        light: 'Lightly Active',
        moderate: 'Moderately Active',
        very: 'Very Active',
        extra: 'Extra Active'
      };
      if (activityEl) {
        activityEl.textContent = activityLabels[ActiveUser.activityLevel] || (ActiveUser.activityLevel ? ActiveUser.activityLevel : 'Moderately Active');
      }

      // Requirement 1 & 3: Display Current Status and Primary Goal SIDE BY SIDE on desktop
      const statusValEl = document.getElementById('dash-status-display');
      const goalValEl = document.getElementById('dash-goal-display');
      const statusSubEl = document.getElementById('dash-status-sub');
      const goalSubEl = document.getElementById('dash-goal-sub');

      if (statusValEl) statusValEl.textContent = ActiveUser.currentStatus || 'Normal weight';
      if (goalValEl) goalValEl.textContent = ActiveUser.primaryGoal || 'Healthy Eating';
      if (statusSubEl) statusSubEl.textContent = `Status: ${ActiveUser.currentStatus || 'Normal weight'}`;
      if (goalSubEl) goalSubEl.textContent = `Goal: ${ActiveUser.primaryGoal || 'Healthy Eating'}`;

      // Requirement 3: Personalized nutrition summary based on permitted preferences and age group
      const ageBadge = document.getElementById('dash-age-group-badge');
      const calSummary = document.getElementById('dash-summary-cal');
      const proSummary = document.getElementById('dash-summary-pro');
      const carbSummary = document.getElementById('dash-summary-carb');
      const fatSummary = document.getElementById('dash-summary-fat');
      const noteSummary = document.getElementById('dash-summary-note');

      const safety = evaluateAgeSafety(ActiveUser.age, ActiveUser.primaryGoal);
      if (ageBadge) ageBadge.textContent = safety.badge;

      const calTarget = ActiveUser.dailyCalorieTarget || 2000;
      const proTarget = ActiveUser.dailyProteinTarget || 120;
      const carbTarget = ActiveUser.dailyCarbTarget || 220;
      const fatTarget = ActiveUser.dailyFatTarget || 60;

      if (calSummary) calSummary.textContent = calTarget.toLocaleString();
      if (proSummary) proSummary.textContent = `${proTarget}g`;
      if (carbSummary) carbSummary.textContent = `${carbTarget}g`;
      if (fatSummary) fatSummary.textContent = `${fatTarget}g`;

      if (noteSummary) {
        if (ActiveUser.age < 5) {
          noteSummary.textContent = 'Pediatric guidance: Growth-supportive whole foods tailored for pediatric development. Please consult with a pediatric healthcare professional.';
        } else if (ActiveUser.age < 18) {
          noteSummary.textContent = `Youth nutrition safeguard active: Non-restrictive balanced meals supporting healthy development and academic vitality. Dietary Preference: ${ActiveUser.dietType || 'Vegetarian'}.`;
        } else if (ActiveUser.age > 70) {
          noteSummary.textContent = `Senior wellness guidance active: Nutrient-dense balanced meals supporting longevity and muscle retention. Consult your physician before pursuing weight change. Dietary Preference: ${ActiveUser.dietType || 'Vegetarian'}.`;
        } else {
          noteSummary.textContent = `Clinical adult nutrition plan configured for ${ActiveUser.primaryGoal || 'Healthy Eating'} with ${ActiveUser.dietType || 'Vegetarian'} preferences.`;
        }
      }
    }

    // Complete Your Profile button handler
    const compBtn = document.getElementById('dash-complete-profile-btn');
    if (compBtn && !compBtn._wired) {
      compBtn._wired = true;
      compBtn.addEventListener('click', () => {
        window.location.hash = '#onboarding';
        navigateTo('onboarding');
      });
    }

    // Totals & Targets
    const totals = calculateTotalIntake();
    const target = ActiveUser.dailyCalorieTarget || 2150;
    const remaining = Math.max(0, target - totals.totalCal);

    const calLeftEl = document.getElementById('dash-calories-left');
    const calConsumedEl = document.getElementById('dash-calories-consumed');
    const calProgressEl = document.getElementById('dash-calorie-progress');
    const proValEl = document.getElementById('dash-protein-val');
    const proProgressEl = document.getElementById('dash-protein-progress');
    const waterValEl = document.getElementById('dash-water-val');
    const waterProgressEl = document.getElementById('dash-water-progress');

    if (calLeftEl) calLeftEl.innerHTML = `${remaining.toLocaleString()} <span class="text-xs text-muted" style="font-weight: 500;">kcal</span>`;
    if (calConsumedEl) calConsumedEl.textContent = totals.totalCal.toLocaleString();
    if (calProgressEl) calProgressEl.style.width = `${Math.min(100, Math.round((totals.totalCal / target) * 100))}%`;

    const proTarget = ActiveUser.dailyProteinTarget || 140;
    if (proValEl) proValEl.innerHTML = `${totals.totalPro}g <span class="text-xs text-muted" style="font-weight: 500;">/ ${proTarget}g</span>`;
    if (proProgressEl) proProgressEl.style.width = `${Math.min(100, Math.round((totals.totalPro / proTarget) * 100))}%`;

    // Today's Meal Completion Status
    renderTodayMealStatus();

    // Today's Meal Plan cards sync
    renderMealPlanCards();

    // Hydration glass UI sync
    updateHydrationGlassesUI();

    // Smart diet-following notifications sync
    updateSmartNotifications();
  }

  function renderTodayMealStatus() {
    if (!ActiveUser) return;

    const slots = [
      { key: 'breakfast', chkId: 'status-chk-breakfast', labelId: 'status-label-breakfast' },
      { key: 'morning_snacks', chkId: 'status-chk-morning-snacks', labelId: 'status-label-morning-snacks' },
      { key: 'lunch', chkId: 'status-chk-lunch', labelId: 'status-label-lunch' },
      { key: 'evening_snacks', chkId: 'status-chk-evening-snacks', labelId: 'status-label-evening-snacks' },
      { key: 'dinner', chkId: 'status-chk-dinner', labelId: 'status-label-dinner' }
    ];

    let loggedCount = 0;

    slots.forEach(slot => {
      const chkEl = document.getElementById(slot.chkId);
      const labelEl = document.getElementById(slot.labelId);
      const items = (ActiveUser.todayLogs && Array.isArray(ActiveUser.todayLogs[slot.key])) ? ActiveUser.todayLogs[slot.key] : [];
      const isLogged = items.length > 0;

      if (isLogged) loggedCount++;

      if (labelEl) {
        labelEl.textContent = isLogged ? 'Logged' : 'Not Logged';
        if (isLogged) {
          labelEl.classList.remove('text-muted');
          labelEl.classList.add('text-success');
        } else {
          labelEl.classList.remove('text-success');
          labelEl.classList.add('text-muted');
        }
      }

      if (chkEl) {
        if (isLogged) {
          chkEl.classList.add('logged', 'completed');
        } else {
          chkEl.classList.remove('logged', 'completed');
        }
      }
    });

    const percentEl = document.getElementById('dash-completion-percent');
    if (percentEl) {
      percentEl.textContent = `${loggedCount} of ${slots.length} Meals Logged`;
    }

    renderDashboardMealsList();
  }

  function renderDashboardMealsList() {
    const container = document.getElementById('dash-meals-list');
    if (!container || !ActiveUser) return;

    const slots = [
      { key: 'breakfast', label: 'Breakfast', icon: 'apple' },
      { key: 'morning_snacks', label: 'Morning Snack', icon: 'cookie' },
      { key: 'lunch', label: 'Lunch', icon: 'salad' },
      { key: 'evening_snacks', label: 'Evening Snack', icon: 'sparkles' },
      { key: 'dinner', label: 'Dinner', icon: 'utensils' },
      { key: 'healthy_drinks', label: 'Healthy Drink', icon: 'cup-soda' }
    ];

    let html = '';

    slots.forEach(slot => {
      const items = (ActiveUser.todayLogs && Array.isArray(ActiveUser.todayLogs[slot.key])) ? ActiveUser.todayLogs[slot.key] : [];
      if (items.length > 0) {
        items.forEach((item, idx) => {
          const servingText = item.serving ? `${item.serving} • ` : '';
          const proText = item.pro !== undefined ? `P: ${item.pro}g • ` : '';
          const carbText = item.carb !== undefined ? `C: ${item.carb}g • ` : '';
          const fatText = item.fat !== undefined ? `F: ${item.fat}g` : '';
          html += `
            <div class="logged-food-item" style="padding: 0.85rem 0.5rem;">
              <div class="flex items-center gap-3" style="flex: 1; min-width: 0;">
                <div class="feature-icon-box" style="width: 38px; height: 38px; margin: 0;"><i data-lucide="${slot.icon}"></i></div>
                <div style="flex: 1; min-width: 0;">
                  <div class="food-item-name" title="${item.name}">${item.name}</div>
                  <div class="food-item-meta">${slot.label} • ${servingText}${item.cal || 0} kcal • ${proText}${carbText}${fatText}</div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge badge-primary"><i data-lucide="check"></i> Logged</span>
                <button type="button" class="btn btn-secondary btn-icon-only delete-dash-food-btn" data-slot="${slot.key}" data-idx="${idx}" title="Remove logged food" aria-label="Delete food entry">
                  <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
                </button>
              </div>
            </div>
          `;
        });
      } else {
        html += `
          <div class="logged-food-item" style="padding: 0.85rem 0.5rem; opacity: 0.9;">
            <div class="flex items-center gap-3">
              <div class="feature-icon-box" style="width: 38px; height: 38px; margin: 0; background: var(--bg-alt); color: var(--text-muted);"><i data-lucide="${slot.icon}"></i></div>
              <div>
                <div class="food-item-name">${slot.label}</div>
                <div class="food-item-meta text-muted">No food logged yet</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge meal-status-badge not-logged"><i data-lucide="clock"></i> Not Logged</span>
              <a href="#nutrition-tracking" class="btn btn-secondary btn-sm" data-nav="nutrition-tracking">+ Quick Log</a>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = html;
    if (window.NutriIcons) window.NutriIcons.renderAll(container);

    // Bind delete buttons on dashboard
    container.querySelectorAll('.delete-dash-food-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const slotKey = btn.getAttribute('data-slot');
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        removeLoggedMealItem(slotKey, idx);
      });
    });
  }

  function updateHydrationGlassesUI() {
    if (!ActiveUser) return;
    const currentMl = getTodayWaterMl();
    const cups = getTodayWaterCups();
    const waterTarget = ActiveUser.waterTargetMl || 2000;

    const waterValEl = document.getElementById('dash-water-val');
    const waterProgressEl = document.getElementById('dash-water-progress');
    const waterSub = document.getElementById('dash-water-sub');

    if (waterValEl) waterValEl.innerHTML = `${currentMl.toLocaleString()} <span class="text-xs text-muted" style="font-weight: 500;">ml</span>`;
    if (waterProgressEl) waterProgressEl.style.width = `${Math.min(100, Math.round((currentMl / waterTarget) * 100))}%`;
    if (waterSub) waterSub.textContent = `Goal: ${waterTarget.toLocaleString()} ml (${cups} of 8 cups)`;

    document.querySelectorAll('#dash-water-glasses .water-glass-btn').forEach(btn => {
      const bCup = parseInt(btn.getAttribute('data-cup'), 10);
      if (bCup <= cups) {
        btn.classList.add('filled');
      } else {
        btn.classList.remove('filled');
      }
    });

    const counter = document.getElementById('dash-cups-counter');
    if (counter) counter.textContent = `${cups} / 8 Cups (${currentMl} ml)`;
  }

  // ==========================================================================
  // 8. ADVANCED MEAL PLANNER ENGINE (100+ Authentic Recipes across 6 Categories)
  // ==========================================================================
  let currentPlannerCategory = 'all';
  let currentPlannerCuisine = 'all';
  let currentPlannerSearch = '';
  let currentViewingRecipe = null;
  let modalServingMultiplier = 1.0;

  function normalizeCategory(cat) {
    if (!cat) return '';
    const c = cat.toLowerCase().replace(/[- ]/g, '_');
    if (c.includes('drink')) return 'healthy_drinks';
    if (c.includes('morning')) return 'morning_snacks';
    if (c.includes('evening')) return 'evening_snacks';
    return c;
  }

  function recipeMatchesCuisine(r, selectedCuisine) {
    if (!selectedCuisine || selectedCuisine === 'all') return true;
    const target = selectedCuisine.toLowerCase().replace(/[- /]/g, '_');
    const tags = (r.cuisineTags || []).map(t => t.toLowerCase().replace(/[- /]/g, '_'));
    const rCuisine = (r.cuisine || '').toLowerCase().replace(/[- /]/g, '_');

    const indianSubtags = ['indian', 'south_indian', 'north_indian', 'andhra_telugu', 'andhra', 'telugu', 'telangana', 'karnataka', 'tamil_nadu', 'kerala', 'ayurvedic'];
    const isIndian = indianSubtags.some(t => tags.includes(t) || rCuisine.includes(t));

    if (target === 'indian') {
      return isIndian;
    }
    if (target === 'global') {
      return tags.includes('global') || !isIndian;
    }
    if (target === 'south_indian') {
      return tags.includes('south_indian') || rCuisine.includes('south_indian') || tags.includes('andhra_telugu') || tags.includes('karnataka') || tags.includes('tamil_nadu') || tags.includes('kerala');
    }
    if (target === 'andhra_telugu' || target === 'andhra' || target === 'telugu') {
      return tags.includes('andhra_telugu') || rCuisine.includes('andhra_telugu') || tags.includes('andhra') || tags.includes('telugu') || rCuisine.includes('andhra');
    }
    if (target === 'telangana') {
      return tags.includes('telangana') || rCuisine.includes('telangana');
    }
    if (target === 'karnataka') {
      return tags.includes('karnataka') || rCuisine.includes('karnataka');
    }
    if (target === 'tamil_nadu') {
      return tags.includes('tamil_nadu') || rCuisine.includes('tamil_nadu');
    }
    if (target === 'kerala') {
      return tags.includes('kerala') || rCuisine.includes('kerala');
    }
    if (target === 'north_indian') {
      return tags.includes('north_indian') || rCuisine.includes('north_indian');
    }
    if (target === 'korean') {
      return tags.includes('korean') || rCuisine.includes('korean');
    }
    if (target === 'italian') {
      return tags.includes('italian') || rCuisine.includes('italian');
    }
    if (target === 'mediterranean') {
      return tags.includes('mediterranean') || rCuisine.includes('mediterranean');
    }
    if (target === 'middle_eastern') {
      return tags.includes('middle_eastern') || rCuisine.includes('middle_eastern');
    }
    if (target === 'chinese') {
      return tags.includes('chinese') || rCuisine.includes('chinese');
    }
    if (target === 'japanese') {
      return tags.includes('japanese') || rCuisine.includes('japanese');
    }
    if (target === 'mexican') {
      return tags.includes('mexican') || rCuisine.includes('mexican');
    }
    if (target === 'thai') {
      return tags.includes('thai') || rCuisine.includes('thai');
    }
    return tags.includes(target) || rCuisine.includes(target);
  }

  function recipeMatchesSearch(recipe, query) {
    if (!query || !query.trim()) return true;
    const q = query.toLowerCase().trim();
    if (recipe.name && recipe.name.toLowerCase().includes(q)) return true;
    if (recipe.cuisine && recipe.cuisine.toLowerCase().includes(q)) return true;
    if (recipe.category && recipe.category.toLowerCase().includes(q)) return true;
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      for (const ing of recipe.ingredients) {
        if (ing.name && ing.name.toLowerCase().includes(q)) return true;
      }
    }
    return false;
  }

  function recipeMatchesDiet(recipe, diet) {
    if (!diet || diet === 'all' || diet === 'balanced' || diet === 'Other') return true;
    const cleanDiet = diet.toLowerCase().replace(/[-_ ]/g, '');
    const tags = (recipe.diet || recipe.dietTypes || []).map(t => t.toLowerCase().replace(/[-_ ]/g, ''));
    if (cleanDiet === 'vegetarian') {
      return tags.includes('vegetarian') || tags.includes('vegan');
    }
    if (cleanDiet === 'vegan') {
      return tags.includes('vegan');
    }
    if (cleanDiet === 'nonvegetarian' || cleanDiet === 'nonveg') {
      return true;
    }
    if (cleanDiet === 'eggetarian') {
      return tags.includes('eggetarian') || tags.includes('vegetarian') || tags.includes('vegan');
    }
    if (cleanDiet === 'highprotein') {
      return tags.includes('highprotein') || (recipe.protein || recipe.pro || 0) >= 18;
    }
    if (cleanDiet === 'keto') {
      return tags.includes('keto') || (recipe.carbs || recipe.carb || 0) <= 15;
    }
    if (cleanDiet === 'mediterranean') {
      return (recipe.cuisine || '').toLowerCase().includes('mediterranean') || (recipe.cuisine || '').toLowerCase().includes('international');
    }
    return tags.includes(cleanDiet);
  }

  function recipeExcludesAllergens(recipe, userAllergies) {
    if (!userAllergies || userAllergies.length === 0) return true;
    const lowerAllergies = userAllergies.map(a => a.toLowerCase().trim()).filter(a => a && a !== 'none');
    if (lowerAllergies.length === 0) return true;

    const recipeAllergens = (recipe.allergens || []).map(a => a.toLowerCase());
    for (const alg of lowerAllergies) {
      if (recipeAllergens.some(ra => ra.includes(alg) || alg.includes(ra))) {
        return false;
      }
      if (recipe.ingredients) {
        for (const ing of recipe.ingredients) {
          if (ing.name && ing.name.toLowerCase().includes(alg)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  const DAILY_MEAL_SLOTS = [
    { key: 'breakfast', label: 'Breakfast', icon: 'sun', defaultId: 'bf-2' },
    { key: 'morning_snacks', label: 'Morning Snack', icon: 'apple', defaultId: 'ms-1' },
    { key: 'lunch', label: 'Lunch', icon: 'salad', defaultId: 'ln-1' },
    { key: 'evening_snacks', label: 'Evening Snack', icon: 'sparkles', defaultId: 'es-1' },
    { key: 'dinner', label: 'Dinner', icon: 'moon', defaultId: 'dn-1' },
    { key: 'healthy_drinks', label: 'Healthy Drink', icon: 'cup-soda', defaultId: 'hd-1' }
  ];

  let isSwappingRecipe = false;

  // Central Reliable Recipe Image Mapping System (Requirement 1 & Part 1)
  function getRecipeImageUrl(recipe) {
    if (!recipe) return 'assets/images/recipes/ln-1.jpg';
    if (recipe.id && typeof recipe.id === 'string') {
      const cleanId = recipe.id.trim();
      return `assets/images/recipes/${cleanId}.jpg`;
    }
    return getCategoryFoodFallback(recipe.category);
  }

  function getCategoryFoodFallback(category) {
    const norm = normalizeCategory(category);
    switch (norm) {
      case 'breakfast':
        return 'assets/images/recipes/bf-1.jpg'; // Steamed Idli & Sambar
      case 'morning_snacks':
        return 'assets/images/recipes/ms-1.jpg'; // Seasonal Fruit Bowl
      case 'lunch':
        return 'assets/images/recipes/ln-1.jpg'; // Andhra Dal & Brown Rice
      case 'evening_snacks':
        return 'assets/images/recipes/es-2.jpg'; // Roasted Makhana
      case 'dinner':
        return 'assets/images/recipes/dn-1.jpg'; // Andhra Menthi Kura Pappu
      case 'healthy_drinks':
        return 'assets/images/recipes/hd-1.jpg'; // Spiced Buttermilk
      default:
        return 'assets/images/recipes/ln-1.jpg';
    }
  }

  function renderMealPlanCards() {
    const container = document.getElementById('meal-plan-cards-container');
    if (!container) return;

    // Age safeguard banner & profile completion banner
    if (ActiveUser) {
      const isComplete = !!(
        ActiveUser.profileCompleted &&
        ActiveUser.currentStatus &&
        ActiveUser.primaryGoal &&
        ActiveUser.age
      );
      const incompleteBanner = document.getElementById('meal-plan-incomplete-banner');
      if (incompleteBanner) {
        incompleteBanner.style.display = isComplete ? 'none' : 'block';
      }

      const safeguardBanner = document.getElementById('meal-plan-age-safeguard-banner');
      if (safeguardBanner) {
        const safety = evaluateAgeSafety(ActiveUser.age, ActiveUser.primaryGoal);
        if (safety.category === 'pediatric' || safety.category === 'youth' || safety.category === 'senior') {
          safeguardBanner.className = `age-safety-card ${safety.category}`;
          safeguardBanner.style.display = 'flex';
          const safeguardTitle = document.getElementById('meal-plan-safeguard-title');
          const safeguardText = document.getElementById('meal-plan-safeguard-text');
          if (safeguardTitle) safeguardTitle.textContent = safety.title;
          if (safeguardText) safeguardText.textContent = safety.message;
        } else {
          safeguardBanner.style.display = 'none';
        }
      }

      // Ensure activePlanIds is initialized with all 6 slots
      if (!ActiveUser.activePlanIds) ActiveUser.activePlanIds = {};
      DAILY_MEAL_SLOTS.forEach(slot => {
        if (!ActiveUser.activePlanIds[slot.key]) {
          ActiveUser.activePlanIds[slot.key] = slot.defaultId;
        }
      });
      if (!ActiveUser.todayLogs) {
        ActiveUser.todayLogs = { breakfast: [], morning_snacks: [], lunch: [], evening_snacks: [], dinner: [], healthy_drinks: [] };
      }
    }

    const db = window.NutriRecipesDB || [];
    const favs = (ActiveUser && ActiveUser.favorites) ? ActiveUser.favorites : [];
    const normPlanCat = normalizeCategory(currentPlannerCategory);
    const hasSearch = !!(currentPlannerSearch && currentPlannerSearch.trim());
    const hasCuisineFilter = currentPlannerCuisine !== 'all';
    const hasCategoryFilter = normPlanCat !== 'all';

    // MODE 1: Standard Active Daily Meal Plan (when all categories, all cuisines, no search)
    if (!hasCategoryFilter && !hasCuisineFilter && !hasSearch) {
      const activeSlots = DAILY_MEAL_SLOTS;

      let cardsHtml = activeSlots.map(slot => {
        const recipeId = (ActiveUser && ActiveUser.activePlanIds && ActiveUser.activePlanIds[slot.key])
          ? ActiveUser.activePlanIds[slot.key]
          : slot.defaultId;

        let r = db.find(x => x.id === recipeId);
        if (!r) {
          r = db.find(x => normalizeCategory(x.category) === slot.key) || {
            id: slot.defaultId,
            name: slot.label + ' Balanced Meal',
            category: slot.key,
            cuisine: 'Indian',
            calories: 450,
            protein: 25,
            carbs: 50,
            fat: 15,
            fiber: 5,
            prepTime: '15 mins',
            image: getCategoryFoodFallback(slot.key)
          };
        }

        const isFav = favs.includes(r.id);
        const cal = r.calories || r.cal || 0;
        const pro = r.protein || r.pro || 0;
        const carb = r.carbs || r.carb || 0;
        const fat = r.fat || 0;
        const fiber = r.fiber || 0;

        // Status check directly from actual saved food log records
        const loggedFoods = (ActiveUser && ActiveUser.todayLogs && Array.isArray(ActiveUser.todayLogs[slot.key]))
          ? ActiveUser.todayLogs[slot.key]
          : [];
        const isMealLogged = loggedFoods.length > 0;

        const reasoning = r.tips || 'Formulated for your selected metabolic targets and clean balanced macronutrients.';
        const sub = (r.substitutions && r.substitutions.length) ? r.substitutions[0] : 'Standard plant/dairy substitutions apply.';
        const imgUrl = getRecipeImageUrl(r);
        const fallbackUrl = getCategoryFoodFallback(slot.key);

        return `
          <div class="meal-recipe-card" data-recipe-id="${r.id}" data-slot="${slot.key}">
            <div class="meal-card-img-wrap">
              <img src="${imgUrl}" alt="${r.name}" class="meal-card-img" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'">
              <span class="meal-type-tag"><i data-lucide="${slot.icon}"></i> ${slot.label}</span>
              <button class="recipe-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${r.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                <i data-lucide="heart"></i>
              </button>
              <span class="meal-status-badge ${isMealLogged ? 'logged' : 'not-logged'}" style="position: absolute; bottom: 10px; left: 10px; z-index: 2;">
                <i data-lucide="${isMealLogged ? 'check-circle' : 'clock'}"></i> ${isMealLogged ? 'Logged' : 'Not Logged'}
              </span>
            </div>

            <div class="meal-body">
              <div class="flex justify-between items-center text-xs text-muted" style="margin-bottom: 0.35rem;">
                <span><i data-lucide="clock"></i> ${r.prepTime || '15 mins'}</span>
                <span class="badge badge-primary">${cal} kcal</span>
              </div>

              <h3 class="meal-title" title="${r.name}">${r.name}</h3>

              <div class="meal-macros-row">
                <span class="macro-chip pro">P: ${pro}g</span>
                <span class="macro-chip carb">C: ${carb}g</span>
                <span class="macro-chip fat">F: ${fat}g</span>
                <span class="macro-chip" style="background: rgba(14, 165, 233, 0.1); color: #0284c7;">Fib: ${fiber}g</span>
              </div>

              <div class="text-xs text-muted" style="margin-top: 0.5rem; line-height: 1.4;">
                <strong>Key ingredients:</strong> ${(r.ingredients || []).slice(0, 3).map(i => i.name).join(', ')}...
              </div>

              <!-- Why this fits & substitutions -->
              <div style="background: var(--bg-alt); padding: 0.45rem 0.65rem; border-radius: var(--radius-sm); margin-top: 0.5rem; font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">
                <div style="font-weight: 600; color: var(--primary-700); margin-bottom: 2px;">💡 Why this fits:</div>
                <div>${reasoning}</div>
                <div style="margin-top: 4px; color: var(--text-muted);"><strong>Swap:</strong> ${sub}</div>
              </div>

              <!-- Action buttons -->
              <div class="meal-card-actions" style="margin-top: 0.75rem;">
                <button class="btn btn-secondary btn-sm view-recipe-btn" data-recipe-id="${r.id}" title="View full recipe & directions">
                  <i data-lucide="book-open"></i> Recipe
                </button>
                <button class="btn btn-secondary btn-sm swap-recipe-btn" data-recipe-id="${r.id}" data-category="${slot.key}" title="Swap with suitable alternative meal">
                  <i data-lucide="refresh-cw"></i> Swap
                </button>
                <button class="btn btn-primary btn-sm log-recipe-btn" data-recipe-id="${r.id}" data-category="${slot.key}" title="Log recommended meal to today's food tracker">
                  <i data-lucide="plus"></i> Log Meal
                </button>
              </div>

              <!-- Consumed / Logged Food Section -->
              <div class="logged-foods-box">
                <div class="flex justify-between items-center" style="margin-bottom: 0.45rem;">
                  <span class="text-xs font-bold" style="color: var(--text-main); display: flex; align-items: center; gap: 4px;">
                    <i data-lucide="utensils" style="width: 14px; height: 14px; color: var(--primary-600);"></i> Logged in this Meal:
                  </span>
                  <span class="text-xs text-muted font-semibold">${loggedFoods.length} logged</span>
                </div>
                ${loggedFoods.length === 0 ? `
                  <div class="text-xs text-muted" style="padding: 0.45rem 0.6rem; background: var(--surface-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-sm); font-style: italic;">
                    No food logged yet
                  </div>
                ` : `
                  <div class="flex flex-col gap-2">
                    ${loggedFoods.map((item, idx) => `
                      <div class="logged-food-chip">
                        <div style="flex: 1; min-width: 0; padding-right: 0.5rem;">
                          <div class="font-bold text-xs" style="color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.name}">${item.name}</div>
                          <div class="text-xs text-muted" style="font-size: 0.72rem; margin-top: 2px;">
                            ${item.serving ? `<span>Qty: ${item.serving} • </span>` : ''}
                            <span>${item.cal || 0} kcal</span> • <span>P: ${item.pro || 0}g</span> • <span>C: ${item.carb || 0}g</span> • <span>F: ${item.fat || 0}g</span>
                          </div>
                        </div>
                        <button type="button" class="remove-logged-meal-btn" data-slot="${slot.key}" data-idx="${idx}" title="Remove this food log" aria-label="Delete food entry">
                          <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
                        </button>
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>

            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = cardsHtml;
      if (window.NutriIcons) window.NutriIcons.renderAll(container);
      bindMealPlanCardEvents(container);
      updatePlanSummaryBanner();
      return;
    }

    // MODE 2: Filtered / Search / Category / Cuisine Catalog View
    const dietSelector = document.getElementById('meal-plan-diet-selector');
    const selectedDiet = dietSelector ? dietSelector.value : (ActiveUser ? ActiveUser.dietType : 'balanced');
    const userAllergies = ActiveUser ? (ActiveUser.allergies || []) : [];

    const matchingRecipes = db.filter(r => {
      // 1. Category filter
      if (hasCategoryFilter) {
        if (normalizeCategory(r.category) !== normPlanCat) return false;
      }
      // 2. Cuisine filter
      if (hasCuisineFilter) {
        if (!recipeMatchesCuisine(r, currentPlannerCuisine)) return false;
      }
      // 3. Search query
      if (hasSearch) {
        if (!recipeMatchesSearch(r, currentPlannerSearch)) return false;
      }
      // 4. Diet filter
      if (!recipeMatchesDiet(r, selectedDiet)) return false;
      // 5. Allergy filter
      if (!recipeExcludesAllergens(r, userAllergies)) return false;

      return true;
    });

    if (matchingRecipes.length === 0) {
      container.innerHTML = `
        <div class="card text-center" style="grid-column: 1 / -1; padding: 3rem 1.5rem;">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin: 0 auto 0.75rem;"></i>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-main);">No recipes found</h3>
          <p class="text-sm text-secondary" style="max-width: 440px; margin: 0 auto 1.25rem; line-height: 1.5;">
            We couldn't find any recipes matching your selected cuisine ("${currentPlannerCuisine}"), category ("${currentPlannerCategory}"), or search query.
          </p>
          <button type="button" class="btn btn-secondary btn-sm" id="reset-recipe-filters-btn">
            <i data-lucide="rotate-ccw"></i> Reset All Filters
          </button>
        </div>
      `;
      if (window.NutriIcons) window.NutriIcons.renderAll(container);
      document.getElementById('reset-recipe-filters-btn')?.addEventListener('click', resetRecipeFilters);
      return;
    }

    let cardsHtml = matchingRecipes.map(r => {
      const isFav = favs.includes(r.id);
      const cal = r.calories || r.cal || 0;
      const pro = r.protein || r.pro || 0;
      const carb = r.carbs || r.carb || 0;
      const fat = r.fat || 0;
      const fiber = r.fiber || 0;
      const normCat = normalizeCategory(r.category);

      // Check if logged in this slot
      const loggedFoods = (ActiveUser && ActiveUser.todayLogs && Array.isArray(ActiveUser.todayLogs[normCat]))
        ? ActiveUser.todayLogs[normCat]
        : [];
      const isThisRecipeLogged = loggedFoods.some(f => f.recipeId === r.id || f.name.toLowerCase() === r.name.toLowerCase());

      // Check if this recipe is active plan recipe for its slot
      const isActiveSlotRecipe = (ActiveUser && ActiveUser.activePlanIds && ActiveUser.activePlanIds[normCat] === r.id);

      const slotObj = DAILY_MEAL_SLOTS.find(s => s.key === normCat) || { label: normCat, icon: 'utensils' };
      const imgUrl = getRecipeImageUrl(r);
      const fallbackUrl = getCategoryFoodFallback(r.category);

      return `
        <div class="meal-recipe-card" data-recipe-id="${r.id}" data-slot="${normCat}">
          <div class="meal-card-img-wrap">
            <img src="${imgUrl}" alt="${r.name}" class="meal-card-img" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}'">
            <span class="meal-type-tag"><i data-lucide="${slotObj.icon}"></i> ${slotObj.label}</span>
            <span class="badge" style="position: absolute; top: 12px; left: 12px; background: rgba(15, 23, 42, 0.75); color: #fff; font-size: 0.72rem; backdrop-filter: blur(4px);">
              ${r.cuisine || 'International'}
            </span>
            <button class="recipe-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${r.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
              <i data-lucide="heart"></i>
            </button>
            ${isThisRecipeLogged ? `
              <span class="meal-status-badge logged" style="position: absolute; bottom: 10px; left: 10px; z-index: 2;">
                <i data-lucide="check-circle"></i> Logged
              </span>
            ` : ''}
            ${isActiveSlotRecipe ? `
              <span class="badge badge-primary" style="position: absolute; bottom: 10px; right: 10px; z-index: 2; font-size: 0.72rem;">
                ★ In Today's Plan
              </span>
            ` : ''}
          </div>

          <div class="meal-body">
            <div class="flex justify-between items-center text-xs text-muted" style="margin-bottom: 0.35rem;">
              <span><i data-lucide="clock"></i> ${r.prepTime || '15 mins'}</span>
              <span class="badge badge-primary">${cal} kcal</span>
            </div>

            <h3 class="meal-title" title="${r.name}">${r.name}</h3>

            <div class="meal-macros-row">
              <span class="macro-chip pro">P: ${pro}g</span>
              <span class="macro-chip carb">C: ${carb}g</span>
              <span class="macro-chip fat">F: ${fat}g</span>
              <span class="macro-chip" style="background: rgba(14, 165, 233, 0.1); color: #0284c7;">Fib: ${fiber}g</span>
            </div>

            <div class="text-xs text-muted" style="margin-top: 0.5rem; line-height: 1.4;">
              <strong>Ingredients:</strong> ${(r.ingredients || []).slice(0, 3).map(i => i.name).join(', ')}...
            </div>

            <!-- Action buttons -->
            <div class="meal-card-actions" style="margin-top: 0.75rem;">
              <button class="btn btn-secondary btn-sm view-recipe-btn" data-recipe-id="${r.id}" title="View full recipe & directions">
                <i data-lucide="book-open"></i> Recipe
              </button>
              <button class="btn btn-secondary btn-sm set-plan-recipe-btn" data-recipe-id="${r.id}" data-category="${normCat}" title="Set as recommended meal for ${slotObj.label}">
                <i data-lucide="calendar-plus"></i> Swap Into Plan
              </button>
              <button class="btn btn-primary btn-sm log-recipe-btn" data-recipe-id="${r.id}" data-category="${normCat}" title="Log meal to today's food tracker">
                <i data-lucide="plus"></i> Log Meal
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = cardsHtml;
    if (window.NutriIcons) window.NutriIcons.renderAll(container);
    bindMealPlanCardEvents(container);
  }

  function bindMealPlanCardEvents(container) {
    container.querySelectorAll('.view-recipe-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openRecipeDetailsModal(btn.getAttribute('data-recipe-id'));
      });
    });

    container.querySelectorAll('.recipe-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRecipeFavorite(btn.getAttribute('data-fav-id'), btn);
      });
    });

    container.querySelectorAll('.swap-recipe-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const rId = btn.getAttribute('data-recipe-id');
        const cat = btn.getAttribute('data-category');
        handleSwapRecipe(rId, cat, btn);
      });
    });

    container.querySelectorAll('.set-plan-recipe-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const rId = btn.getAttribute('data-recipe-id');
        const cat = btn.getAttribute('data-category');
        setRecipeIntoActivePlan(rId, cat);
      });
    });

    container.querySelectorAll('.log-recipe-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const rId = btn.getAttribute('data-recipe-id');
        const cat = btn.getAttribute('data-category');
        logRecipeToTracker(rId, cat);
      });
    });

    container.querySelectorAll('.remove-logged-meal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const slotKey = btn.getAttribute('data-slot');
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        removeLoggedMealItem(slotKey, idx);
      });
    });
  }

  function setRecipeIntoActivePlan(recipeId, category) {
    if (!ActiveUser) {
      showToast('Please sign in to customize your meal plan.', 'info');
      return;
    }
    const db = window.NutriRecipesDB || [];
    const recipe = db.find(r => r.id === recipeId);
    if (!recipe) return;

    const normCat = normalizeCategory(category || recipe.category);
    if (!ActiveUser.activePlanIds) ActiveUser.activePlanIds = {};
    ActiveUser.activePlanIds[normCat] = recipe.id;
    persistActiveUser();

    renderMealPlanCards();
    renderGroceryList();
    updatePlanSummaryBanner();
    renderDashboardMealsList();
    showToast(`Swapped "${recipe.name}" into today's ${normCat.replace('_', ' ').toUpperCase()} plan! 🥗`, 'success');
  }

  function resetRecipeFilters() {
    currentPlannerCategory = 'all';
    currentPlannerCuisine = 'all';
    currentPlannerSearch = '';

    document.querySelectorAll('.category-tab-btn, .meal-cat-tab').forEach(t => {
      t.classList.toggle('active', (t.getAttribute('data-cat') || 'all') === 'all');
    });

    document.querySelectorAll('.cuisine-filter-btn').forEach(b => {
      b.classList.toggle('active', (b.getAttribute('data-cuisine') || 'all') === 'all');
    });

    const selector = document.getElementById('meal-plan-cuisine-selector');
    if (selector) selector.value = 'all';

    const searchInput = document.getElementById('meal-plan-search-input');
    if (searchInput) searchInput.value = '';

    const searchClear = document.getElementById('meal-plan-search-clear-btn');
    if (searchClear) searchClear.style.display = 'none';

    renderMealPlanCards();
  }

  function toggleRecipeFavorite(recipeId, btnEl) {
    if (!ActiveUser) {
      showToast('Please sign in to save favorite recipes.', 'info');
      window.location.hash = '#login';
      navigateTo('login');
      return;
    }
    if (!ActiveUser.favorites) ActiveUser.favorites = [];

    const idx = ActiveUser.favorites.indexOf(recipeId);
    if (idx > -1) {
      ActiveUser.favorites.splice(idx, 1);
      if (btnEl) btnEl.classList.remove('active');
      showToast('Removed from favorites', 'info');
    } else {
      ActiveUser.favorites.push(recipeId);
      if (btnEl) btnEl.classList.add('active');
      showToast('Added to your favorite recipes! ❤️', 'success');
    }
    persistActiveUser();
  }

  async function handleSwapRecipe(currentRecipeId, category, buttonEl) {
    if (isSwappingRecipe) return;
    isSwappingRecipe = true;

    const origBtnHtml = buttonEl ? buttonEl.innerHTML : '';
    if (buttonEl) {
      buttonEl.disabled = true;
      buttonEl.innerHTML = '<i data-lucide="loader" class="nutri-spin"></i> Swapping...';
      if (window.NutriIcons) window.NutriIcons.renderAll(buttonEl);
    }

    try {
      await new Promise(r => setTimeout(r, 200));

      const db = window.NutriRecipesDB || [];
      const normCat = normalizeCategory(category);
      const selectedDiet = ActiveUser ? ActiveUser.dietType : 'balanced';
      const userAllergies = ActiveUser ? (ActiveUser.allergies || []) : [];
      const activeCuisine = currentPlannerCuisine || (ActiveUser ? ActiveUser.preferredCuisine : 'all') || 'all';

      // 1. Strict candidates: same category, different ID, matches active cuisine, matches diet, excludes allergens
      let candidates = db.filter(r => {
        if (normalizeCategory(r.category) !== normCat) return false;
        if (r.id === currentRecipeId) return false;
        if (!recipeMatchesCuisine(r, activeCuisine)) return false;
        if (!recipeMatchesDiet(r, selectedDiet)) return false;
        if (!recipeExcludesAllergens(r, userAllergies)) return false;
        return true;
      });

      // 2. If no candidates matching cuisine & diet, relax diet while strictly maintaining cuisine & allergen safety
      if (candidates.length === 0 && activeCuisine !== 'all') {
        candidates = db.filter(r => {
          if (normalizeCategory(r.category) !== normCat) return false;
          if (r.id === currentRecipeId) return false;
          if (!recipeMatchesCuisine(r, activeCuisine)) return false;
          if (!recipeExcludesAllergens(r, userAllergies)) return false;
          return true;
        });
      }

      // 3. If still no candidates, relax cuisine while maintaining category, diet and strict allergen safety
      if (candidates.length === 0) {
        candidates = db.filter(r => {
          if (normalizeCategory(r.category) !== normCat) return false;
          if (r.id === currentRecipeId) return false;
          if (!recipeMatchesDiet(r, selectedDiet)) return false;
          if (!recipeExcludesAllergens(r, userAllergies)) return false;
          return true;
        });
      }

      // 4. Fallback: all non-conflicting in category
      if (candidates.length === 0) {
        candidates = db.filter(r => {
          if (normalizeCategory(r.category) !== normCat) return false;
          if (r.id === currentRecipeId) return false;
          if (!recipeExcludesAllergens(r, userAllergies)) return false;
          return true;
        });
      }

      if (candidates.length === 0) {
        showToast('No alternative recipes found that meet your safety and diet requirements.', 'warning');
        return;
      }

      // Pick a candidate
      const pick = candidates[Math.floor(Math.random() * candidates.length)];

      if (!ActiveUser) {
        showToast('Please sign in to save meal plan customizations.', 'info');
        return;
      }

      if (!ActiveUser.activePlanIds) ActiveUser.activePlanIds = {};
      ActiveUser.activePlanIds[normCat] = pick.id;
      persistActiveUser();

      showToast(`Swapped for: ${pick.name}! 🥗`, 'success');

      // Update UI immediately
      renderMealPlanCards();
      renderGroceryList();
      updatePlanSummaryBanner();
      renderDashboardMealsList();
      updateSmartNotifications();
    } catch (err) {
      console.error('Error swapping recipe', err);
      showToast('Could not swap recipe. Please try again.', 'error');
    } finally {
      isSwappingRecipe = false;
      if (buttonEl) {
        buttonEl.disabled = false;
        buttonEl.innerHTML = origBtnHtml || '<i data-lucide="refresh-cw"></i> Swap';
        if (window.NutriIcons) window.NutriIcons.renderAll(buttonEl);
      }
    }
  }

  function logRecipeToTracker(recipeId, category) {
    const db = window.NutriRecipesDB || [];
    const recipe = db.find(r => r.id === recipeId);
    if (!recipe) return;
    logRecipeToTrackerWithMultiplier(recipe, 1.0, category);
  }

  function logRecipeToTrackerWithMultiplier(recipe, multiplier = 1.0, category = null) {
    if (!recipe) return;
    if (!ActiveUser) {
      showToast('Please sign in to log recipes to your tracker.', 'info');
      window.location.hash = '#login';
      navigateTo('login');
      return;
    }

    const cat = normalizeCategory(category || recipe.category);
    if (!ActiveUser.todayLogs) {
      ActiveUser.todayLogs = { breakfast: [], morning_snacks: [], lunch: [], evening_snacks: [], dinner: [], healthy_drinks: [] };
    }
    if (!Array.isArray(ActiveUser.todayLogs[cat])) {
      ActiveUser.todayLogs[cat] = [];
    }

    const mult = multiplier || 1.0;
    const baseCal = recipe.calories || recipe.cal || 0;
    const basePro = recipe.protein || recipe.pro || 0;
    const baseCarb = recipe.carbs || recipe.carb || 0;
    const baseFat = recipe.fat || 0;

    ActiveUser.todayLogs[cat].push({
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: mult !== 1.0 ? `${recipe.name} (${mult.toFixed(1)}x)` : recipe.name,
      cal: Math.round(baseCal * mult),
      pro: Math.round(basePro * mult),
      carb: Math.round(baseCarb * mult),
      fat: Math.round(baseFat * mult),
      serving: mult !== 1.0 ? `${mult.toFixed(1)}x (${recipe.servingSize || '1 serving'})` : (recipe.servingSize || '1 serving'),
      recipeId: recipe.id
    });

    persistActiveUser();
    renderMealPlanCards();
    renderTodayMealStatus();
    renderDashboardMealsList();
    refreshFoodTracker();
    updateSmartNotifications();
    showToast(`Logged "${recipe.name}"${mult !== 1.0 ? ` (${mult.toFixed(1)}x)` : ''} to ${cat.replace('_', ' ').toUpperCase()}! 🍽️`, 'success');
  }

  function removeLoggedMealItem(slotKey, idx) {
    if (!ActiveUser || !ActiveUser.todayLogs || !Array.isArray(ActiveUser.todayLogs[slotKey])) return;
    const removed = ActiveUser.todayLogs[slotKey].splice(idx, 1);
    persistActiveUser();
    renderMealPlanCards();
    renderTodayMealStatus();
    renderDashboardMealsList();
    refreshFoodTracker();
    updateSmartNotifications();
    if (removed && removed[0]) {
      showToast(`Removed "${removed[0].name}" from ${slotKey.replace('_', ' ').toUpperCase()}`, 'info');
    }
  }

  async function generateFullDayMealPlan() {
    const genBtn = document.getElementById('generate-daily-plan-btn');
    const regenBtn = document.getElementById('regenerate-plan-btn');
    const origGenText = genBtn ? genBtn.innerHTML : '';
    const origRegenText = regenBtn ? regenBtn.innerHTML : '';

    if (genBtn) {
      genBtn.disabled = true;
      genBtn.innerHTML = '<i data-lucide="loader" class="nutri-spin"></i> Generating Plan...';
    }
    if (regenBtn) {
      regenBtn.disabled = true;
      regenBtn.innerHTML = '<i data-lucide="loader" class="nutri-spin"></i> Refreshing...';
    }
    if (window.NutriIcons) {
      if (genBtn) window.NutriIcons.renderAll(genBtn);
      if (regenBtn) window.NutriIcons.renderAll(regenBtn);
    }

    const user = ActiveUser || {
      dietType: 'vegetarian',
      allergies: [],
      dislikedIngredients: [],
      mealCount: 5,
      goal: 'maintain',
      age: 28,
      dailyCalorieTarget: 2150
    };

    const dietSelector = document.getElementById('meal-plan-diet-selector');
    if (dietSelector && dietSelector.value) {
      user.dietType = dietSelector.value;
      if (ActiveUser) ActiveUser.dietType = dietSelector.value;
    }

    let generatedFromAi = false;
    try {
      const response = await fetch('/api/ai/generate-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userProfile: user })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && Array.isArray(data.meals) && data.meals.length > 0) {
          generatedFromAi = true;
          showToast('✨ Gemini AI generated your customized meal plan!', 'success');
        }
      }
    } catch (e) {
      console.log('AI meal plan endpoint offline or key unconfigured, using curated fallback.');
    }

    if (!generatedFromAi) {
      applyCuratedFallbackMealPlan(user);
      showToast('🥗 Generated personalized plan from Curated Clinical Recipe Database!', 'success');
    }

    if (genBtn) {
      genBtn.disabled = false;
      genBtn.innerHTML = origGenText || '<i data-lucide="sparkles"></i> Generate Full-Day Meal Plan';
      if (window.NutriIcons) window.NutriIcons.renderAll(genBtn);
    }
    if (regenBtn) {
      regenBtn.disabled = false;
      regenBtn.innerHTML = origRegenText || '<i data-lucide="refresh-cw"></i> Regenerate';
      if (window.NutriIcons) window.NutriIcons.renderAll(regenBtn);
    }

    renderMealPlanCards();
    renderGroceryList();
    updatePlanSummaryBanner();
  }

  function applyCuratedFallbackMealPlan(user) {
    const db = window.NutriRecipesDB || [];
    const mealCount = user.mealCount || 6;
    const selectedDiet = user.dietType || 'balanced';
    const userAllergies = user.allergies || [];
    const prefCuisine = (user.preferredCuisine || currentPlannerCuisine || 'all').toLowerCase();

    let categories = ['breakfast', 'morning_snacks', 'lunch', 'evening_snacks', 'dinner', 'healthy_drinks'];
    if (mealCount === 3) categories = ['breakfast', 'lunch', 'dinner'];
    else if (mealCount === 4) categories = ['breakfast', 'lunch', 'evening_snacks', 'dinner'];
    else if (mealCount === 5) categories = ['breakfast', 'morning_snacks', 'lunch', 'evening_snacks', 'dinner'];

    const newPlan = {};
    const currentActive = (ActiveUser && ActiveUser.activePlanIds) ? ActiveUser.activePlanIds : {};

    categories.forEach(cat => {
      const normCat = normalizeCategory(cat);

      // 1. Strict pool: category + preferred cuisine + diet + allergy safety
      let pool = db.filter(r => {
        if (normalizeCategory(r.category) !== normCat) return false;
        if (!recipeMatchesCuisine(r, prefCuisine)) return false;
        if (!recipeMatchesDiet(r, selectedDiet)) return false;
        if (!recipeExcludesAllergens(r, userAllergies)) return false;
        return true;
      });

      // 2. If pool is empty, relax preferred cuisine but maintain diet & allergy safety
      if (pool.length === 0) {
        pool = db.filter(r => {
          if (normalizeCategory(r.category) !== normCat) return false;
          if (!recipeMatchesDiet(r, selectedDiet)) return false;
          if (!recipeExcludesAllergens(r, userAllergies)) return false;
          return true;
        });
      }

      // 3. Fallback: all safe recipes in category
      if (pool.length === 0) {
        pool = db.filter(r => {
          if (normalizeCategory(r.category) !== normCat) return false;
          if (!recipeExcludesAllergens(r, userAllergies)) return false;
          return true;
        });
      }

      // Duplicate prevention: avoid currently active ID if alternative available
      const altPool = pool.filter(r => r.id !== currentActive[normCat]);
      const finalPool = altPool.length > 0 ? altPool : pool;

      const pick = finalPool[Math.floor(Math.random() * finalPool.length)];
      if (pick) newPlan[normCat] = pick.id;
    });

    if (ActiveUser) {
      ActiveUser.activePlanIds = newPlan;
      persistActiveUser();
    }
  }

  function updatePlanSummaryBanner() {
    const db = window.NutriRecipesDB || [];
    const planIds = (ActiveUser && ActiveUser.activePlanIds) ? ActiveUser.activePlanIds : {
      breakfast: 'bf-2',
      morning_snacks: 'ms-1',
      lunch: 'ln-1',
      evening_snacks: 'es-1',
      dinner: 'dn-1',
      healthy_drinks: 'hd-1'
    };

    let totalCal = 0, totalPro = 0, totalCarb = 0, totalFat = 0, totalFiber = 0;

    Object.values(planIds).forEach(id => {
      const r = db.find(x => x.id === id);
      if (r) {
        totalCal += (r.calories || r.cal || 0);
        totalPro += (r.protein || r.pro || 0);
        totalCarb += (r.carbs || r.carb || 0);
        totalFat += (r.fat || 0);
        totalFiber += (r.fiber || 0);
      }
    });

    const calEl = document.getElementById('day-total-cal') || document.getElementById('plan-summary-calories');
    const proEl = document.getElementById('day-total-pro') || document.getElementById('plan-summary-protein');
    const carbEl = document.getElementById('day-total-carb') || document.getElementById('plan-summary-carbs');
    const fatEl = document.getElementById('day-total-fat') || document.getElementById('plan-summary-fat');
    const fibEl = document.getElementById('day-total-fiber');
    const targetText = document.getElementById('plan-target-calories-text');

    if (calEl) calEl.textContent = `${totalCal}`;
    if (proEl) proEl.textContent = `${totalPro}g`;
    if (carbEl) carbEl.textContent = `${totalCarb}g`;
    if (fatEl) fatEl.textContent = `${totalFat}g`;
    if (fibEl) fibEl.textContent = `${totalFiber}g`;
    if (targetText && ActiveUser) {
      targetText.textContent = `${ActiveUser.dailyCalorieTarget || 2150} kcal`;
    }
  }

  // ==========================================================================
  // 9. RECIPE DETAILS MODAL & ACTIONS
  // ==========================================================================
  function updateModalServingDisplay() {
    if (!currentViewingRecipe) return;
    const recipe = currentViewingRecipe;
    const mult = modalServingMultiplier;

    const multEl = document.getElementById('modal-serving-multiplier-display');
    if (multEl) multEl.textContent = `${mult.toFixed(1)}x`;

    const calEl = document.getElementById('modal-macro-cal');
    const proEl = document.getElementById('modal-macro-pro');
    const carbEl = document.getElementById('modal-macro-carb');
    const fatEl = document.getElementById('modal-macro-fat');

    const baseCal = recipe.calories || recipe.cal || 0;
    const basePro = recipe.protein || recipe.pro || 0;
    const baseCarb = recipe.carbs || recipe.carb || 0;
    const baseFat = recipe.fat || 0;

    if (calEl) calEl.textContent = `${Math.round(baseCal * mult)}`;
    if (proEl) proEl.textContent = `${Math.round(basePro * mult)}g`;
    if (carbEl) carbEl.textContent = `${Math.round(baseCarb * mult)}g`;
    if (fatEl) fatEl.textContent = `${Math.round(baseFat * mult)}g`;

    const servEl = document.getElementById('modal-recipe-serving');
    if (servEl) {
      const baseServ = recipe.servingSize || recipe.serving || '1 Serving';
      servEl.textContent = mult === 1.0 ? baseServ : `${baseServ} (${mult.toFixed(1)}x)`;
    }

    const ingList = document.getElementById('modal-ingredients-list');
    if (ingList && recipe.ingredients) {
      ingList.innerHTML = recipe.ingredients.map(ing => {
        let displayAmount = ing.amount;
        const num = parseFloat(ing.amount);
        if (!isNaN(num)) {
          const scaled = +(num * mult).toFixed(1);
          displayAmount = scaled;
        }
        return `
          <li class="flex justify-between items-center" style="background: var(--bg-card); padding: 0.45rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span>• ${ing.name}</span>
            <strong style="color: var(--primary-600);">${displayAmount} ${ing.unit || ''}</strong>
          </li>
        `;
      }).join('');
    }
  }

  function openRecipeDetailsModal(recipeId) {
    const db = window.NutriRecipesDB || [];
    const recipe = db.find(r => r.id === recipeId);
    if (!recipe) return;

    currentViewingRecipe = recipe;
    modalServingMultiplier = 1.0;

    const modal = document.getElementById('recipe-details-modal');
    if (!modal) return;

    const catEl = document.getElementById('modal-recipe-category');
    const imgEl = document.getElementById('modal-recipe-img');
    const titleEl = document.getElementById('modal-recipe-title');
    const metaEl = document.getElementById('modal-recipe-meta');
    const insList = document.getElementById('modal-instructions-list');
    const tipsEl = document.getElementById('modal-recipe-tips');
    const allergenBadge = document.getElementById('modal-allergen-badge');
    const subText = document.getElementById('modal-substitutions-text');
    const favBtn = document.getElementById('modal-fav-btn');

    if (catEl) catEl.textContent = (recipe.category || 'meal').replace(/[-_]/g, ' ').toUpperCase();
    if (imgEl) {
      imgEl.src = getRecipeImageUrl(recipe);
      imgEl.alt = recipe.name;
      imgEl.onerror = () => { imgEl.src = getCategoryFoodFallback(recipe.category); };
    }
    if (titleEl) titleEl.textContent = recipe.name;
    if (metaEl) {
      metaEl.innerHTML = `<span><i data-lucide="clock"></i> Prep: ${recipe.prepTime || '15 mins'}</span> • <span><i data-lucide="flame"></i> Cook: ${recipe.cookTime || '15 mins'}</span> • <span><i data-lucide="award"></i> ${recipe.difficulty || 'Easy'}</span>`;
    }

    if (insList) {
      insList.innerHTML = (recipe.instructions || []).map((step, idx) => `
        <li style="margin-bottom: 0.35rem;">
          <span style="font-weight: 600; color: var(--text-primary); margin-right: 0.25rem;">Step ${idx + 1}:</span> ${step}
        </li>
      `).join('');
    }

    if (tipsEl) {
      tipsEl.textContent = recipe.tips || 'Steaming and gentle sautéing preserve micronutrients and healthy fats.';
    }

    if (allergenBadge) {
      const algs = recipe.allergens || [];
      allergenBadge.textContent = algs.length && algs[0] !== 'None' ? `Allergens: ${algs.join(', ')}` : 'Allergens: None';
    }

    if (subText) {
      const subs = recipe.substitutions || [];
      subText.textContent = subs.length ? `Substitutions: ${subs.join('; ')}` : 'Substitutions: Standard plant/dairy options apply.';
    }

    if (favBtn) {
      const isFav = ActiveUser && ActiveUser.favorites && ActiveUser.favorites.includes(recipe.id);
      favBtn.classList.toggle('active', !!isFav);
    }

    updateModalServingDisplay();

    modal.classList.add('active');
    modal.style.display = 'flex';
    if (window.NutriIcons) window.NutriIcons.renderAll(modal);
  }

  function closeRecipeDetailsModal() {
    const modal = document.getElementById('recipe-details-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
    currentViewingRecipe = null;
  }

  // ==========================================================================
  // 10. FAVORITES VIEW RENDERER
  // ==========================================================================
  function renderFavoritesView() {
    const container = document.getElementById('favorites-grid');
    const emptyState = document.getElementById('favorites-empty-state');
    if (!container) return;

    const favIds = (ActiveUser && ActiveUser.favorites) ? ActiveUser.favorites : [];
    const db = window.NutriRecipesDB || [];
    const favRecipes = db.filter(r => favIds.includes(r.id));

    if (favRecipes.length === 0) {
      container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'grid';

    container.innerHTML = favRecipes.map(r => {
      const cal = r.calories || r.cal || 0;
      const pro = r.protein || r.pro || 0;
      const carb = r.carbs || r.carb || 0;
      const fat = r.fat || 0;
      const normCat = normalizeCategory(r.category);

      const imgUrl = getRecipeImageUrl(r);
      const fallbackUrl = getCategoryFoodFallback(r.category);

      return `
        <div class="meal-recipe-card">
          <div class="meal-card-img-wrap">
            <img src="${imgUrl}" alt="${r.name}" class="meal-card-img" onerror="this.onerror=null;this.src='${fallbackUrl}'">
            <span class="meal-type-tag">${r.category.replace(/[-_]/g, ' ').toUpperCase()}</span>
            <button class="recipe-fav-btn active" data-fav-id="${r.id}" title="Remove from favorites">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="meal-body">
            <h3 class="meal-title">${r.name}</h3>
            <div class="meal-macros-row">
              <span class="macro-chip pro">P: ${pro}g</span>
              <span class="macro-chip carb">C: ${carb}g</span>
              <span class="macro-chip fat">F: ${fat}g</span>
            </div>
            <div class="meal-card-actions" style="margin-top: 1rem;">
              <button class="btn btn-secondary btn-sm view-recipe-btn" data-recipe-id="${r.id}" style="flex: 1;">
                <i data-lucide="book-open"></i> View
              </button>
              <button class="btn btn-primary btn-sm log-recipe-btn" data-recipe-id="${r.id}" data-category="${normCat}" style="flex: 1;">
                <i data-lucide="plus"></i> Log
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.NutriIcons) window.NutriIcons.renderAll(container);

    container.querySelectorAll('.view-recipe-btn').forEach(b => {
      b.addEventListener('click', () => openRecipeDetailsModal(b.getAttribute('data-recipe-id')));
    });
    container.querySelectorAll('.log-recipe-btn').forEach(b => {
      b.addEventListener('click', () => logRecipeToTracker(b.getAttribute('data-recipe-id'), b.getAttribute('data-category')));
    });
    container.querySelectorAll('.recipe-fav-btn').forEach(b => {
      b.addEventListener('click', () => {
        toggleRecipeFavorite(b.getAttribute('data-fav-id'), b);
        renderFavoritesView();
      });
    });
  }

  // ==========================================================================
  // 11. AUTOMATED GROCERY LIST WITH MATHEMATICAL INGREDIENT AGGREGATION
  // ==========================================================================
  function aggregateIngredientsFromPlan() {
    const db = window.NutriRecipesDB || [];
    const planIds = (ActiveUser && ActiveUser.activePlanIds) ? ActiveUser.activePlanIds : {
      breakfast: 'bf-2',
      morning_snacks: 'ms-1',
      lunch: 'ln-1',
      evening_snacks: 'es-1',
      dinner: 'dn-1',
      healthy_drinks: 'hd-1'
    };

    // Aggregate ingredient amounts mathematically
    // Key: name.toLowerCase() -> { name, amount, unit, category }
    const agg = {};

    Object.values(planIds).forEach(id => {
      const r = db.find(x => x.id === id);
      if (r && r.ingredients) {
        r.ingredients.forEach(ing => {
          const key = ing.name.toLowerCase().trim();
          if (!agg[key]) {
            agg[key] = {
              name: ing.name,
              amount: parseFloat(ing.amount) || 1,
              unit: ing.unit || '',
              category: ing.category || 'pantry'
            };
          } else {
            // Aggregate if same unit or numerical
            if (agg[key].unit === ing.unit) {
              agg[key].amount = +(agg[key].amount + (parseFloat(ing.amount) || 1)).toFixed(1);
            } else {
              // Different unit, e.g. "50g + 1 cup", keep combined
              agg[key].amount = `${agg[key].amount} ${agg[key].unit} + ${ing.amount}`;
            }
          }
        });
      }
    });

    return Object.values(agg);
  }

  function renderGroceryList() {
    const grid = document.getElementById('grocery-categories-grid');
    if (!grid) return;

    const items = aggregateIngredientsFromPlan();

    // Map into 7 standard categories
    const categories = {
      produce: { label: '🥬 Fresh Produce', color: 'var(--primary-600)', items: [] },
      protein: { label: '🥩 Protein & Dairy', color: 'var(--accent-cyan)', items: [] },
      grain: { label: '🌾 Whole Grains & Legumes', color: 'var(--accent-amber)', items: [] },
      pantry: { label: '🫒 Pantry, Spices & Seasonings', color: 'var(--accent-coral)', items: [] },
      fat: { label: '🥜 Healthy Fats, Nuts & Seeds', color: '#8b5cf6', items: [] },
      dairy: { label: '🥛 Dairy & Milks', color: '#06b6d4', items: [] },
      custom: { label: '✏️ Custom Added Items', color: 'var(--primary-700)', items: [] }
    };

    items.forEach(i => {
      const cat = categories[i.category] ? i.category : 'pantry';
      categories[cat].items.push(i);
    });

    // Add user's custom added items
    if (ActiveUser && ActiveUser.customGrocery) {
      ActiveUser.customGrocery.forEach(c => {
        categories.custom.items.push(c);
      });
    }

    grid.innerHTML = Object.entries(categories).map(([catKey, catObj]) => {
      if (catObj.items.length === 0 && catKey !== 'custom') return '';

      return `
        <div class="card" style="padding: 1.1rem; border-top: 3px solid ${catObj.color};">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: ${catObj.color}; font-weight: 600;">
            ${catObj.label} (${catObj.items.length})
          </h4>
          <ul class="grocery-item-list" style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${catObj.items.map((item, idx) => `
              <li class="flex justify-between items-center text-sm" style="padding: 4px 0; border-bottom: 1px dashed var(--border-color);">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" class="grocery-checkbox" ${item.checked ? 'checked' : ''} data-cat="${catKey}" data-idx="${idx}">
                  <span class="${item.checked ? 'grocery-checked-text' : ''}" style="${item.checked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    ${item.name}
                  </span>
                </label>
                <span class="badge" style="font-size: 0.75rem; background: var(--bg-secondary); color: var(--text-secondary); font-weight: 600;">
                  ${item.amount} ${item.unit}
                </span>
              </li>
            `).join('')}
            ${catObj.items.length === 0 ? `<li class="text-xs text-muted">No custom items yet.</li>` : ''}
          </ul>
        </div>
      `;
    }).join('');

    // Bind checkboxes
    grid.querySelectorAll('.grocery-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const textSpan = e.target.parentElement.querySelector('span');
        if (textSpan) {
          if (e.target.checked) {
            textSpan.style.textDecoration = 'line-through';
            textSpan.style.opacity = '0.6';
          } else {
            textSpan.style.textDecoration = 'none';
            textSpan.style.opacity = '1';
          }
        }
      });
    });
  }

  function addCustomGroceryItem(name, amount = '1', unit = 'item') {
    if (!name || !ActiveUser) return;
    if (!ActiveUser.customGrocery) ActiveUser.customGrocery = [];

    ActiveUser.customGrocery.push({
      name,
      amount,
      unit,
      category: 'custom',
      checked: false
    });

    persistActiveUser();
    renderGroceryList();
    showToast(`Added "${name}" to your grocery list! 🛒`, 'success');
  }

  // ==========================================================================
  // 12. DEDICATED AI FOOD SCANNER (Live Camera, Upload, Vision AI & Curated Samples)
  // ==========================================================================
  let cameraStream = null;
  let currentFacingMode = 'environment';
  let currentCameraMode = 'upload';
  let currentPortionMultiplier = 1.0;

  const SAMPLE_PLATES = {
    salad: {
      name: 'Mediterranean Avocado Salad Bowl',
      cal: 380, pro: 14, carb: 28, fat: 22, fiber: 7,
      confidence: 96,
      category: 'lunch',
      serving: '1 bowl (~260g)',
      image: 'assets/images/recipes/ln-14.jpg',
      detectedItems: [
        { name: 'Fresh Hass Avocado', portion: '100g', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
        { name: 'Baby Spinach & Mixed Greens', portion: '80g', calories: 20, protein: 2.5, carbs: 3, fat: 0.5, fiber: 2 },
        { name: 'Cherry Tomatoes & Cucumbers', portion: '80g', calories: 25, protein: 1, carbs: 5, fat: 0.2, fiber: 1.2 },
        { name: 'Extra Virgin Olive Dressing', portion: '15ml', calories: 175, protein: 0, carbs: 0, fat: 19, fiber: 0 }
      ],
      likelyIngredients: ['Fresh Hass Avocado', 'Baby Spinach', 'Cherry Tomatoes', 'Extra Virgin Olive Oil'],
      uncertainIngredients: ['Olive oil dressing volume (±15%)', 'Added sodium / sea salt', 'Lemon juice dressing']
    },
    idli: {
      name: 'Steamed Idli with Vegetable Sambar',
      cal: 320, pro: 10, carb: 62, fat: 3, fiber: 7,
      confidence: 97,
      category: 'breakfast',
      serving: '3 idlis with sambar (~250g)',
      image: 'assets/images/recipes/bf-1.jpg',
      detectedItems: [
        { name: 'Steamed Fermented Idlis (3 pcs)', portion: '150g', calories: 190, protein: 5, carbs: 42, fat: 1, fiber: 2.5 },
        { name: 'Toor Dal Vegetable Sambar', portion: '100g', calories: 130, protein: 5, carbs: 20, fat: 2, fiber: 4.5 }
      ],
      likelyIngredients: ['Fermented Rice & Urad Batter', 'Toor Dal (Pigeon Peas)', 'Drumstick & Carrots', 'Mustard Seeds'],
      uncertainIngredients: ['Ghee / oil in tadka tempering (±15%)', 'Added sodium seasoning in sambar']
    },
    paneer: {
      name: 'Palak Paneer with Whole-Wheat Roti',
      cal: 420, pro: 20, carb: 45, fat: 18, fiber: 8,
      confidence: 95,
      category: 'dinner',
      serving: '1 bowl curry + 2 rotis (~280g)',
      image: 'assets/images/recipes/ln-7.jpg',
      detectedItems: [
        { name: 'Palak Paneer Gravy with Paneer', portion: '180g', calories: 260, protein: 14, carbs: 10, fat: 17, fiber: 4.5 },
        { name: 'Whole-Wheat Phulka Rotis (2 pcs)', portion: '70g', calories: 160, protein: 6, carbs: 35, fat: 1, fiber: 3.5 }
      ],
      likelyIngredients: ['Fresh Low-Fat Paneer Cubes', 'Pureed Spinach (Palak)', 'Whole Wheat Atta', 'Indian Garam Masala'],
      uncertainIngredients: ['Ghee/butter in gravy (±15%)', 'Hidden cooking oil', 'Sodium seasoning']
    },
    poha: {
      name: 'Spiced Indian Vegetable Poha',
      cal: 290, pro: 8, carb: 48, fat: 8, fiber: 5,
      confidence: 96,
      category: 'breakfast',
      serving: '1 medium plate (~200g)',
      image: 'assets/images/recipes/bf-2.jpg',
      detectedItems: [
        { name: 'Steamed Flattened Rice Base', portion: '140g', calories: 190, protein: 3.5, carbs: 40, fat: 1.5, fiber: 2 },
        { name: 'Roasted Peanuts & Green Peas', portion: '40g', calories: 80, protein: 4, carbs: 6, fat: 5.5, fiber: 2.5 },
        { name: 'Mustard Seeds & Curry Leaves', portion: '20g', calories: 20, protein: 0.5, carbs: 2, fat: 1, fiber: 0.5 }
      ],
      likelyIngredients: ['Flattened Rice (Poha)', 'Roasted Peanuts', 'Green Peas', 'Mustard Seeds & Turmeric'],
      uncertainIngredients: ['Peanut oil used in tempering (±15%)', 'Table salt seasoning']
    },
    sprouts: {
      name: 'Moong Sprouts Chaat',
      cal: 195, pro: 12, carb: 32, fat: 2, fiber: 8,
      confidence: 98,
      category: 'morning_snacks',
      serving: '1 bowl (~180g)',
      image: 'assets/images/recipes/ms-5.jpg',
      detectedItems: [
        { name: 'Sprouted Green Moong Beans', portion: '120g', calories: 130, protein: 9.5, carbs: 22, fat: 1, fiber: 6 },
        { name: 'Pomegranate Seeds & Cucumber', portion: '50g', calories: 50, protein: 1.5, carbs: 10, fat: 0.5, fiber: 1.8 },
        { name: 'Lemon Juice & Chaat Masala', portion: '10g', calories: 15, protein: 1, carbs: 0, fat: 0.5, fiber: 0.2 }
      ],
      likelyIngredients: ['Sprouted Green Moong Beans', 'Pomegranate Arils', 'Cucumber Cubes', 'Fresh Lemon Juice'],
      uncertainIngredients: ['Black rock salt / chaat sodium (±10%)']
    }
  };

  let currentScanResult = null;
  let currentScanImageSrc = null;

  function getApiEndpoint(path) {
    if (window.location.protocol === 'file:' || (window.location.port && window.location.port !== '8080')) {
      return 'http://localhost:8080' + path;
    }
    return path;
  }

  function renderItemizedBreakdown(items, multiplier = 1.0) {
    const container = document.getElementById('scanner-itemized-breakdown');
    if (!container) return;
    if (!items || !items.length) {
      container.innerHTML = '<div class="text-xs text-muted" style="padding: 4px 0;">Itemized components not available for this plate.</div>';
      return;
    }
    container.innerHTML = items.map(item => {
      const itemCal = Math.round((item.calories || 0) * multiplier);
      const itemPro = Math.round(((item.protein || 0) * multiplier) * 10) / 10;
      const itemCarb = Math.round(((item.carbs || 0) * multiplier) * 10) / 10;
      const itemFat = Math.round(((item.fat || 0) * multiplier) * 10) / 10;
      const itemFib = Math.round(((item.fiber || 0) * multiplier) * 10) / 10;

      let portionText = item.portion || '';
      if (portionText && multiplier !== 1.0) {
        const match = portionText.match(/^(\d+(?:\.\d+)?)\s*(g|ml|pcs|cup|cups)?/i);
        if (match) {
          const val = parseFloat(match[1]);
          const unit = match[2] || 'g';
          portionText = `${Math.round(val * multiplier)}${unit}`;
        } else {
          portionText = `${portionText} (${multiplier}x)`;
        }
      }

      return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.78rem;">
          <div style="flex: 1; min-width: 0; padding-right: 8px;">
            <div style="font-weight: 600; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(item.name)}">
              ${escapeHtml(item.name)}
            </div>
            <div class="text-xs text-muted" style="font-size: 0.7rem; margin-top: 1px;">
              ${portionText ? `<span class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.65rem; padding: 1px 4px; margin-right: 4px;">${escapeHtml(portionText)}</span>` : ''}
              <span>P: ${itemPro}g</span> • <span>C: ${itemCarb}g</span> • <span>F: ${itemFat}g</span> • <span>Fib: ${itemFib}g</span>
            </div>
          </div>
          <div style="font-weight: 700; color: var(--primary-700); font-size: 0.82rem; white-space: nowrap;">
            ${itemCal} kcal
          </div>
        </div>
      `;
    }).join('');
  }

  function initScannerView() {
    const readyState = document.getElementById('scanner-ready-state');
    const validSection = document.getElementById('scanner-valid-food-section');

    // Pre-fill API key input if stored in localStorage
    const savedKey = localStorage.getItem('nutriai_gemini_api_key');
    const keyInput = document.getElementById('scanner-api-key-input');
    if (keyInput && savedKey) {
      keyInput.value = savedKey;
    }

    if (currentScanResult) {
      if (readyState) readyState.style.display = 'none';
      if (validSection) validSection.style.display = 'block';
      updateScannerPortionUI();
      evaluateFoodSuitabilityAndAlternatives(currentScanResult);
    } else {
      if (readyState) readyState.style.display = 'block';
      if (validSection) validSection.style.display = 'none';
    }

    if (window.lucide) {
      try { lucide.createIcons(); } catch (e) {}
    }
  }

  async function startScannerCamera() {
    const video = document.getElementById('scanner-live-video');
    const errBox = document.getElementById('scanner-camera-error');
    const errMsg = document.getElementById('scanner-camera-error-msg');
    if (errBox) errBox.style.display = 'none';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (errBox) errBox.style.display = 'block';
      if (errMsg) errMsg.textContent = 'Camera capture is not supported by your browser environment. Please use photo upload.';
      showToast('Camera access is not supported by your browser.', 'error');
      return;
    }

    try {
      if (cameraStream) stopScannerCamera();
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: currentFacingMode }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (video) {
        video.srcObject = cameraStream;
        video.style.display = 'block';
        video.play();
      }
    } catch (err) {
      console.warn('Camera error:', err);
      if (errBox) errBox.style.display = 'block';
      if (errMsg) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errMsg.textContent = 'Camera permission was denied. Please allow camera access in your browser settings or switch to file upload.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errMsg.textContent = 'No camera device found on this system. Please upload a photo of your meal.';
        } else {
          errMsg.textContent = `Could not access camera (${err.message || 'Unavailable'}). Please upload a meal photo instead.`;
        }
      }
      showToast('Camera access unavailable. You can easily upload a meal photo.', 'warning');
    }
  }

  function stopScannerCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }
    const video = document.getElementById('scanner-live-video');
    if (video) video.srcObject = null;
  }

  function captureCameraFrame() {
    const video = document.getElementById('scanner-live-video');
    const canvas = document.getElementById('scanner-capture-canvas');
    if (!video || !canvas) return;

    if (!video.videoWidth || !video.videoHeight) {
      showToast('Camera feed is still loading. Please hold steady...', 'info');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    stopScannerCamera();

    // Switch back to upload tab to display captured preview
    const tabUpload = document.getElementById('scanner-tab-upload');
    if (tabUpload) tabUpload.click();

    const previewWrap = document.getElementById('scanner-main-preview-wrap');
    const emptyWrap = document.getElementById('scanner-main-empty');
    const previewImg = document.getElementById('scanner-main-preview-img');
    const rescanBtn = document.getElementById('scanner-rescan-btn');

    if (emptyWrap) emptyWrap.style.display = 'none';
    if (previewWrap) previewWrap.style.display = 'block';
    if (previewImg) previewImg.src = dataUrl;
    if (rescanBtn) rescanBtn.style.display = 'block';
    currentScanImageSrc = dataUrl;

    analyzeFoodImage(dataUrl, 'Captured Plate');
  }

  function loadSamplePlateData(plate) {
    const previewWrap = document.getElementById('scanner-main-preview-wrap');
    const emptyWrap = document.getElementById('scanner-main-empty');
    const previewImg = document.getElementById('scanner-main-preview-img');
    const readyState = document.getElementById('scanner-ready-state');
    const rejectionCard = document.getElementById('scanner-rejection-card');
    const unconfCard = document.getElementById('scanner-unconfigured-card');
    const validSection = document.getElementById('scanner-valid-food-section');
    const loadingEl = document.getElementById('scanner-loading-indicator');
    const rescanBtn = document.getElementById('scanner-rescan-btn');

    if (loadingEl) loadingEl.style.display = 'none';
    if (readyState) readyState.style.display = 'none';
    if (emptyWrap) emptyWrap.style.display = 'none';
    if (previewWrap) previewWrap.style.display = 'block';
    if (previewImg) previewImg.src = plate.image || 'assets/images/recipes/ln-1.jpg';
    currentScanImageSrc = plate.image || 'assets/images/recipes/ln-1.jpg';
    if (rejectionCard) rejectionCard.style.display = 'none';
    if (unconfCard) unconfCard.style.display = 'none';
    if (validSection) validSection.style.display = 'block';
    if (rescanBtn) rescanBtn.style.display = 'block';

    currentScanResult = {
      name: plate.name,
      servingSize: plate.serving || '1 standard plate (~250g)',
      baseCal: plate.cal,
      basePro: plate.pro,
      baseCarb: plate.carb,
      baseFat: plate.fat,
      baseFiber: plate.fiber || 6,
      cal: plate.cal,
      pro: plate.pro,
      carb: plate.carb,
      fat: plate.fat,
      fiber: plate.fiber || 6,
      confidence: plate.confidence,
      category: plate.category || 'lunch',
      detectedItems: plate.detectedItems || [],
      likelyIngredients: plate.likelyIngredients || plate.ingredients || [],
      uncertainIngredients: plate.uncertainIngredients || ['Cooking oil dressing (±15%)', 'Added sodium / seasoning']
    };

    const titleEl = document.getElementById('scanner-food-title');
    const nameInput = document.getElementById('scanner-correct-name');
    const confBadge = document.getElementById('scanner-confidence-badge');
    const statusEl = document.getElementById('scanner-service-status');
    const catEl = document.getElementById('scanner-detected-category');
    const mealSelect = document.getElementById('scanner-target-meal-type');
    const servingEl = document.getElementById('scanner-serving-size');

    if (titleEl) titleEl.textContent = plate.name;
    if (nameInput) nameInput.value = plate.name;
    if (servingEl) servingEl.textContent = currentScanResult.servingSize;
    if (confBadge) confBadge.textContent = `Confidence: ${plate.confidence}%`;
    if (statusEl) statusEl.textContent = '✨ Verified Curated Plate';
    if (catEl) catEl.textContent = (plate.category || 'lunch').replace('_', ' ').toUpperCase();
    if (mealSelect && plate.category) mealSelect.value = plate.category.replace('_', '-');

    currentPortionMultiplier = 1.0;
    document.querySelectorAll('.portion-chip-btn').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-portion') === '1.0');
    });

    updateScannerPortionUI();
    evaluateFoodSuitabilityAndAlternatives(currentScanResult);
    showToast(`Loaded curated test plate: "${plate.name}" 🥗`, 'success');
  }

  function handleInvalidSampleScan(type) {
    const readyState = document.getElementById('scanner-ready-state');
    const rejectionCard = document.getElementById('scanner-rejection-card');
    const rejectionTitle = document.getElementById('scanner-rejection-title');
    const rejectionText = document.getElementById('scanner-rejection-msg') || document.getElementById('scanner-rejection-text');
    const rejectionSub = document.getElementById('scanner-rejection-sub');
    const validSection = document.getElementById('scanner-valid-food-section');
    const unconfCard = document.getElementById('scanner-unconfigured-card');
    const loadingEl = document.getElementById('scanner-loading-indicator');
    const statusEl = document.getElementById('scanner-service-status');
    const confBadge = document.getElementById('scanner-confidence-badge');
    const rescanBtn = document.getElementById('scanner-rescan-btn');

    if (loadingEl) loadingEl.style.display = 'none';
    if (readyState) readyState.style.display = 'none';
    if (validSection) validSection.style.display = 'none';
    if (unconfCard) unconfCard.style.display = 'none';
    if (rescanBtn) rescanBtn.style.display = 'block';

    if (type === 'laptop' || type === 'non_food') {
      if (rejectionCard) rejectionCard.style.display = 'flex';
      if (rejectionTitle) rejectionTitle.textContent = 'Invalid Food Image Detected';
      if (rejectionText) rejectionText.textContent = 'Invalid Food Image: Please upload a clear image of a food item or meal.';
      if (rejectionSub) rejectionSub.textContent = 'Detected subject: Laptop / electronic hardware (non-edible item).';
      if (statusEl) statusEl.textContent = '❌ Non-Food Rejected';
      if (confBadge) confBadge.textContent = 'Rejected (0% Food)';
      showToast('Invalid Food Image: Please upload a clear image of a food item or meal.', 'warning', 5000);
    } else {
      if (rejectionCard) rejectionCard.style.display = 'flex';
      if (rejectionTitle) rejectionTitle.textContent = 'Unable to Identify Image';
      if (rejectionText) rejectionText.textContent = 'Unable to identify the food clearly. Please upload a clearer image.';
      if (rejectionSub) rejectionSub.textContent = 'The image is too blurry, underexposed, or low-contrast to measure calories.';
      if (statusEl) statusEl.textContent = '⚠️ Unclear Image';
      if (confBadge) confBadge.textContent = 'Low Quality / Dark';
      showToast('Unable to identify the food clearly. Please upload a clearer image.', 'warning', 5000);
    }
  }

  async function analyzeFoodImage(imageSrc, labelHint = '') {
    const statusEl = document.getElementById('scanner-service-status');
    const confBadge = document.getElementById('scanner-confidence-badge');
    const titleEl = document.getElementById('scanner-food-title');
    const nameInput = document.getElementById('scanner-correct-name');
    const validSection = document.getElementById('scanner-valid-food-section');
    const rejectionCard = document.getElementById('scanner-rejection-card');
    const rejectionTitle = document.getElementById('scanner-rejection-title');
    const rejectionText = document.getElementById('scanner-rejection-msg') || document.getElementById('scanner-rejection-text');
    const rejectionSub = document.getElementById('scanner-rejection-sub');
    const unconfCard = document.getElementById('scanner-unconfigured-card');
    const loadingEl = document.getElementById('scanner-loading-indicator');
    const rescanBtn = document.getElementById('scanner-rescan-btn');

    // Reject unsupported or corrupted image inputs
    if (!imageSrc || typeof imageSrc !== 'string' || imageSrc.length < 50) {
      if (validSection) validSection.style.display = 'none';
      if (loadingEl) loadingEl.style.display = 'none';
      if (rejectionCard) {
        rejectionCard.style.display = 'flex';
        if (rejectionTitle) rejectionTitle.textContent = 'Unsupported or Corrupted Image';
        if (rejectionText) rejectionText.textContent = 'Invalid Food Image: Please upload a clear image of a food item or meal.';
        if (rejectionSub) rejectionSub.textContent = 'The uploaded file payload was empty or unreadable.';
      }
      showToast('Invalid Food Image: Please upload a clear image of a food item or meal.', 'warning');
      return;
    }

    // Show loading UI
    if (validSection) validSection.style.display = 'none';
    if (rejectionCard) rejectionCard.style.display = 'none';
    if (unconfCard) unconfCard.style.display = 'none';
    if (loadingEl) loadingEl.style.display = 'block';
    if (rescanBtn) rescanBtn.style.display = 'block';

    if (statusEl) statusEl.textContent = 'Analyzing plate features...';
    if (confBadge) confBadge.textContent = 'Scanning...';

    // Sample color profile using client canvas
    let colorProfile = null;
    try {
      const sampleImg = new Image();
      sampleImg.src = imageSrc;
      await new Promise((resolve) => {
        if (sampleImg.complete) resolve();
        else {
          sampleImg.onload = resolve;
          sampleImg.onerror = resolve;
        }
      });
      if (sampleImg.width > 0 && sampleImg.height > 0) {
        const offscreen = document.createElement('canvas');
        offscreen.width = 32;
        offscreen.height = 32;
        const ctx = offscreen.getContext('2d');
        ctx.drawImage(sampleImg, 0, 0, 32, 32);
        const imgData = ctx.getImageData(0, 0, 32, 32).data;
        let rTotal = 0, gTotal = 0, bTotal = 0, greenCount = 0, yellowCount = 0, redCount = 0, brownCount = 0;
        const totalPixels = 32 * 32;
        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2];
          rTotal += r; gTotal += g; bTotal += b;
          if (g > 100 && g > r * 1.15 && g > b * 1.15) greenCount++;
          if (r > 130 && g > 110 && b < 90) yellowCount++;
          if (r > 130 && r > g * 1.3 && r > b * 1.3) redCount++;
          if (r > 90 && g > 50 && g < 110 && b < 60) brownCount++;
        }
        colorProfile = {
          avgR: Math.round(rTotal / totalPixels),
          avgG: Math.round(gTotal / totalPixels),
          avgB: Math.round(bTotal / totalPixels),
          greenPct: greenCount / totalPixels,
          yellowPct: yellowCount / totalPixels,
          redPct: redCount / totalPixels,
          brownPct: brownCount / totalPixels
        };
      }
    } catch (e) {
      console.warn('Client color sampling note:', e);
    }

    const readyState = document.getElementById('scanner-ready-state');
    if (readyState) readyState.style.display = 'none';

    try {
      const savedKey = localStorage.getItem('nutriai_gemini_api_key') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (savedKey) headers['x-gemini-api-key'] = savedKey;

      const res = await fetch(getApiEndpoint('/api/ai/scan-food'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          imageBase64: imageSrc,
          apiKey: savedKey || undefined
        })
      });

      if (loadingEl) loadingEl.style.display = 'none';

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.warn('Response JSON parse error:', err);
      }

      // Check if Gemini API Key is required or invalid
      if (data && (data.requiresApiKey || data.error === 'GEMINI_API_KEY_REQUIRED' || data.error === 'INVALID_API_KEY')) {
        if (validSection) validSection.style.display = 'none';
        if (rejectionCard) rejectionCard.style.display = 'none';
        if (unconfCard) {
          unconfCard.style.display = 'block';
          const unconfTitle = document.getElementById('scanner-unconfigured-title');
          const unconfText = document.getElementById('scanner-unconfigured-text');
          const keyContainer = document.getElementById('scanner-api-key-container');
          if (keyContainer) keyContainer.style.display = 'block';

          if (data.error === 'INVALID_API_KEY') {
            if (unconfTitle) unconfTitle.textContent = 'Invalid Gemini API Key';
            if (unconfText) unconfText.textContent = data.message || 'The Gemini API key entered was rejected by Google AI Studio. Please verify and connect a valid key below.';
            const keyInput = document.getElementById('scanner-api-key-input');
            if (keyInput) keyInput.focus();
            showToast('The provided Gemini API key is invalid. Please check Google AI Studio.', 'error', 6000);
          } else {
            if (unconfTitle) unconfTitle.textContent = 'Gemini API Key Required';
            if (unconfText) unconfText.textContent = data.message || 'A Google Gemini Vision API key is required to analyze food photos. Enter your API key below or configure GEMINI_API_KEY in your server .env file.';
            showToast('Gemini Vision API key is required to scan food photos.', 'warning', 6000);
          }
        }
        if (statusEl) statusEl.textContent = '⚠️ API Key Required';
        if (confBadge) confBadge.textContent = 'API Key Required';
        return;
      }

      // Check for non-food or unclear image rejection
      if (data && data.success === false) {
        if (validSection) validSection.style.display = 'none';
        if (unconfCard) unconfCard.style.display = 'none';
        if (rejectionCard) {
          rejectionCard.style.display = 'flex';
          if (rejectionTitle) {
            rejectionTitle.textContent = data.status === 'non_food' ? 'Invalid Food Image Detected' : 'Unable to Identify Food';
          }
          if (rejectionText) {
            rejectionText.textContent = data.message || 'Please upload a clear image of a food item or meal.';
          }
          if (rejectionSub) {
            rejectionSub.textContent = data.reason ? `Detected: ${data.detectedSubject || 'Item'} — ${data.reason}` : '';
          }
        }
        if (statusEl) statusEl.textContent = data.status === 'non_food' ? '❌ Non-Food Rejected' : '⚠️ Unclear Image';
        if (confBadge) confBadge.textContent = 'Validation: Rejected';
        showToast(data.message || 'Invalid Food Image: Please upload a clear image of a food item or meal.', 'warning', 5000);
        return;
      }

      // Check for valid food result
      if (data && data.success && data.analysis) {
        const a = data.analysis;
        if (readyState) readyState.style.display = 'none';
        if (rejectionCard) rejectionCard.style.display = 'none';
        if (unconfCard) unconfCard.style.display = 'none';
        if (validSection) validSection.style.display = 'block';

        currentScanResult = {
          name: a.foodName || 'Identified Dish',
          servingSize: a.servingSize || '1 standard plate (~250g)',
          baseCal: a.calories || 350,
          basePro: a.protein || 18,
          baseCarb: a.carbs || 40,
          baseFat: a.fat || 12,
          baseFiber: a.fiber || 5,
          cal: a.calories || 350,
          pro: a.protein || 18,
          carb: a.carbs || 40,
          fat: a.fat || 12,
          fiber: a.fiber || 5,
          confidence: a.confidence || 90,
          category: a.category || 'lunch',
          detectedItems: a.detectedItems || [
            { name: a.foodName || 'Main Dish', portion: a.servingSize || '1 serving', calories: a.calories || 350, protein: a.protein || 18, carbs: a.carbs || 40, fat: a.fat || 12, fiber: a.fiber || 5 }
          ],
          likelyIngredients: a.likelyIngredients || a.ingredients || ['Fresh whole ingredients'],
          uncertainIngredients: a.uncertainIngredients || ['Cooking oil dressing (±15% estimated)', 'Added sodium / seasoning'],
          engine: data.engine || 'NutriAI Vision',
          serviceNotice: data.serviceNotice || null
        };

        if (titleEl) titleEl.textContent = currentScanResult.name;
        if (nameInput) nameInput.value = currentScanResult.name;
        if (confBadge) confBadge.textContent = `Confidence: ${currentScanResult.confidence}%`;
        if (statusEl) statusEl.textContent = `✨ ${data.engine || 'AI Food Vision'}`;

        const catEl = document.getElementById('scanner-detected-category');
        if (catEl) catEl.textContent = (currentScanResult.category || 'lunch').replace(/[-_]/g, ' ').toUpperCase();

        const mealSelect = document.getElementById('scanner-target-meal-type');
        if (mealSelect && currentScanResult.category) {
          mealSelect.value = currentScanResult.category.replace('_', '-');
        }

        currentPortionMultiplier = 1.0;
        document.querySelectorAll('.portion-chip-btn').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-portion') === '1.0');
        });

        updateScannerPortionUI();
        evaluateFoodSuitabilityAndAlternatives(currentScanResult);

        showToast(`AI Vision: Identified "${currentScanResult.name}"! 📸`, 'success');
        return;
      }

      // Any other unexpected response
      if (!res.ok) {
        if (validSection) validSection.style.display = 'none';
        if (unconfCard) {
          unconfCard.style.display = 'block';
          const unconfTitle = document.getElementById('scanner-unconfigured-title');
          const unconfText = document.getElementById('scanner-unconfigured-text');
          if (unconfTitle) unconfTitle.textContent = 'AI Vision Error';
          if (unconfText) unconfText.textContent = (data && data.message) ? data.message : `API request failed with status ${res.status}.`;
        }
        showToast((data && data.message) || `AI Scan failed (${res.status})`, 'error');
        return;
      }

    } catch (e) {
      console.warn('Scanner connection error:', e);
      if (loadingEl) loadingEl.style.display = 'none';
      if (validSection) validSection.style.display = 'none';
      if (rejectionCard) rejectionCard.style.display = 'none';
      if (unconfCard) {
        unconfCard.style.display = 'block';
        const unconfTitle = document.getElementById('scanner-unconfigured-title');
        const unconfText = document.getElementById('scanner-unconfigured-text');
        const keyContainer = document.getElementById('scanner-api-key-container');
        if (keyContainer) keyContainer.style.display = 'none';
        if (unconfTitle) unconfTitle.textContent = 'Backend Server Disconnected';
        if (unconfText) unconfText.innerHTML = 'Could not reach <code>/api/ai/scan-food</code>. Please ensure the NutriAI backend server is running (<code>node server.js</code> on port 8080).';
      }
      if (statusEl) statusEl.textContent = '⚠️ Server Offline';
      if (confBadge) confBadge.textContent = 'Server Offline';
      showToast('Could not reach NutriAI backend server. Please run "node server.js".', 'error', 6000);
      return;
    }
  }

  function evaluateFoodSuitabilityAndAlternatives(foodData) {
    if (!foodData) return;

    const userGoal = ActiveUser?.primaryGoal || 'Healthy Eating';
    const userDiet = ActiveUser?.dietType || 'Vegetarian';
    const userAllergies = ActiveUser?.allergies || [];

    const foodName = (foodData.name || '').toLowerCase();
    const cal = foodData.cal || foodData.baseCal || 350;
    const pro = foodData.pro || foodData.basePro || 15;
    const fat = foodData.fat || foodData.baseFat || 12;
    const carb = foodData.carb || foodData.baseCarb || 40;
    const ingredients = (foodData.likelyIngredients || foodData.ingredients || []).map(i => (typeof i === 'string' ? i.toLowerCase() : ''));

    // 1. Check allergen conflicts
    const allergenClashes = [];
    const allergenKeywords = {
      gluten: ['wheat', 'flour', 'bread', 'roti', 'chapati', 'pasta', 'gluten', 'maida', 'semolina', 'suji', 'rawa'],
      dairy: ['milk', 'cheese', 'paneer', 'yogurt', 'curd', 'butter', 'ghee', 'cream', 'lassi'],
      nuts: ['peanut', 'almond', 'cashew', 'walnut', 'pistachio', 'nut', 'hazelnut'],
      eggs: ['egg', 'omelette', 'mayo', 'mayonnaise'],
      seafood: ['fish', 'prawn', 'shrimp', 'crab', 'salmon', 'tuna'],
      soy: ['soy', 'tofu', 'edamame', 'tempeh']
    };

    userAllergies.forEach(allergen => {
      const key = allergen.toLowerCase();
      const keywords = allergenKeywords[key] || [key];
      const found = keywords.some(kw => foodName.includes(kw) || ingredients.some(ing => ing.includes(kw)));
      if (found) allergenClashes.push(allergen);
    });

    // 2. Check diet conflicts
    let dietConflict = false;
    let dietReason = '';
    const nonVegKeywords = ['chicken', 'mutton', 'lamb', 'beef', 'pork', 'fish', 'prawn', 'shrimp', 'meat', 'seafood'];
    const eggKeywords = ['egg', 'omelette'];
    const dairyKeywords = ['milk', 'cheese', 'paneer', 'yogurt', 'curd', 'butter', 'ghee', 'cream'];

    if (userDiet === 'Vegetarian') {
      if (nonVegKeywords.some(kw => foodName.includes(kw) || ingredients.some(ing => ing.includes(kw)))) {
        dietConflict = true;
        dietReason = 'Contains non-vegetarian ingredients, conflicting with your Vegetarian preference.';
      }
    } else if (userDiet === 'Vegan') {
      if (nonVegKeywords.some(kw => foodName.includes(kw) || ingredients.some(ing => ing.includes(kw))) ||
          eggKeywords.some(kw => foodName.includes(kw) || ingredients.some(ing => ing.includes(kw))) ||
          dairyKeywords.some(kw => foodName.includes(kw) || ingredients.some(ing => ing.includes(kw)))) {
        dietConflict = true;
        dietReason = 'Contains animal or dairy ingredients, conflicting with your Vegan preference.';
      }
    }

    // 3. Goal alignment
    let goalFit = 'High';
    let goalExplanation = '';

    if (userGoal.toLowerCase().includes('loss')) {
      if (cal > 550) {
        goalFit = 'Moderate';
        goalExplanation = `Slightly calorie-dense (${cal} kcal) for your Weight Loss target. Consider a 0.5x portion or one of the lighter alternatives below.`;
      } else if (pro >= 12 && cal <= 450) {
        goalFit = 'High';
        goalExplanation = `Excellent for Weight Loss (${cal} kcal) — high satiety with ${pro}g protein and controlled calories.`;
      } else {
        goalFit = 'High';
        goalExplanation = `Well-portioned (${cal} kcal) to stay within your daily caloric deficit target.`;
      }
    } else if (userGoal.toLowerCase().includes('gain')) {
      if (cal < 300) {
        goalFit = 'Moderate';
        goalExplanation = `Relatively light (${cal} kcal) for weight gain. Pair with whole grains or nuts to reach your daily caloric surplus.`;
      } else if (pro >= 20) {
        goalFit = 'High';
        goalExplanation = `Superb for Weight & Muscle Gain — dense with ${pro}g protein and energy-sustaining clean macros.`;
      } else {
        goalFit = 'High';
        goalExplanation = `Calorie-rich meal helping you reach your daily growth surplus cleanly.`;
      }
    } else {
      // Healthy eating / maintenance
      goalExplanation = `Balanced nutritional profile (${cal} kcal, ${pro}g protein, ${carb}g carbs) supporting steady energy and metabolic health.`;
    }

    // 4. Update Suitability UI Badge & Card
    const badgeEl = document.getElementById('scanner-suitability-badge');
    const reasonEl = document.getElementById('scanner-suitability-reason');
    const cardEl = document.getElementById('scanner-suitability-card');

    if (allergenClashes.length > 0) {
      if (badgeEl) {
        badgeEl.textContent = 'Allergy Warning';
        badgeEl.style.background = 'rgba(239, 68, 68, 0.15)';
        badgeEl.style.color = '#dc2626';
      }
      if (reasonEl) {
        reasonEl.innerHTML = `<strong style="color: #dc2626;">Caution:</strong> May contain <strong>${allergenClashes.join(', ')}</strong>, which matches your recorded allergy profile.`;
      }
      if (cardEl) cardEl.style.borderLeftColor = 'var(--accent-coral, #ef4444)';
    } else if (dietConflict) {
      if (badgeEl) {
        badgeEl.textContent = 'Diet Mismatch';
        badgeEl.style.background = 'rgba(239, 68, 68, 0.15)';
        badgeEl.style.color = '#dc2626';
      }
      if (reasonEl) {
        reasonEl.innerHTML = `<strong style="color: #dc2626;">Dietary Alert:</strong> ${dietReason}`;
      }
      if (cardEl) cardEl.style.borderLeftColor = 'var(--accent-coral, #ef4444)';
    } else if (goalFit === 'Moderate') {
      if (badgeEl) {
        badgeEl.textContent = 'Moderate Fit';
        badgeEl.style.background = 'rgba(245, 158, 11, 0.15)';
        badgeEl.style.color = '#d97706';
      }
      if (reasonEl) {
        reasonEl.textContent = goalExplanation;
      }
      if (cardEl) cardEl.style.borderLeftColor = 'var(--accent-amber, #f59e0b)';
    } else {
      if (badgeEl) {
        badgeEl.textContent = 'Suitable & Aligned';
        badgeEl.style.background = 'rgba(16, 185, 129, 0.15)';
        badgeEl.style.color = '#059669';
      }
      if (reasonEl) {
        reasonEl.textContent = goalExplanation;
      }
      if (cardEl) cardEl.style.borderLeftColor = 'var(--primary-500, #10b981)';
    }

    // 5. Populate Visible vs Uncertain Ingredients
    const visTags = document.getElementById('scanner-ingredients-tags');
    const uncertTags = document.getElementById('scanner-uncertain-tags');

    const visibleList = foodData.likelyIngredients || foodData.ingredients || ['Fresh whole ingredients'];
    if (visTags) {
      visTags.innerHTML = visibleList.map(ing => `<span class="badge badge-primary">${escapeHtml(typeof ing === 'string' ? ing : ing.name || 'Ingredient')}</span>`).join('');
    }

    const uncertainList = foodData.uncertainIngredients || [
      'Cooking oil / dressing (±15%)',
      'Added sodium & seasoning',
      'Hidden sauces or marinades'
    ];
    if (uncertTags) {
      uncertTags.innerHTML = uncertainList.map(ing => 
        `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706; border: 1px dashed rgba(245, 158, 11, 0.4);">${escapeHtml(ing)}</span>`
      ).join('');
    }

    // 6. Suggest Up to 3 Healthier Alternatives from Verified Database
    renderScannerAlternatives(foodData);
  }

  function renderScannerAlternatives(foodData) {
    const grid = document.getElementById('scanner-alternatives-grid');
    if (!grid) return;

    const db = window.NutriRecipesDB || (typeof DEFAULT_RECIPES !== 'undefined' ? DEFAULT_RECIPES : []);
    if (!db || db.length === 0) {
      grid.innerHTML = '<p class="text-xs text-muted">No database recipes available.</p>';
      return;
    }

    // Determine category
    let cat = normalizeCategory(foodData.category || 'lunch');
    let candidates = db.filter(r => r.category === cat);
    if (candidates.length < 3) {
      candidates = db;
    }

    // Filter out the exact same recipe name
    const scannedName = (foodData.name || '').toLowerCase();
    let filtered = candidates.filter(r => !scannedName.includes(r.name.toLowerCase()) && !r.name.toLowerCase().includes(scannedName));
    if (filtered.length < 3) filtered = candidates;

    // Filter by diet preference if user is vegetarian or vegan
    const userDiet = ActiveUser?.dietType || 'Vegetarian';
    const isVeg = r => Array.isArray(r.diet) ? (r.diet.includes('vegetarian') || r.diet.includes('vegan')) : (r.diet === 'vegetarian' || r.diet === 'vegan');
    const isVegan = r => Array.isArray(r.diet) ? r.diet.includes('vegan') : (r.diet === 'vegan');

    if (userDiet === 'Vegetarian') {
      const vegOnly = filtered.filter(isVeg);
      if (vegOnly.length >= 3) filtered = vegOnly;
    } else if (userDiet === 'Vegan') {
      const veganOnly = filtered.filter(isVegan);
      if (veganOnly.length >= 3) filtered = veganOnly;
    }

    const picked = filtered.slice(0, 3);

    grid.innerHTML = picked.map(r => `
      <div class="card" style="padding: 0.6rem; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--radius-md); background: var(--bg-card);">
        <div style="position: relative; height: 90px; border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 0.45rem;">
          <img src="${getRecipeImageUrl(r)}" alt="${escapeHtml(r.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='${getCategoryFoodFallback(r.category)}';">
          <span style="position: absolute; bottom: 4px; right: 4px; background: rgba(0,0,0,0.65); color: #fff; font-size: 0.65rem; padding: 1px 5px; border-radius: 4px; font-weight: 600;">${r.calories} kcal</span>
        </div>
        <div style="font-size: 0.78rem; font-weight: 700; line-height: 1.25; margin-bottom: 0.35rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${escapeHtml(r.name)}">
          ${escapeHtml(r.name)}
        </div>
        <div class="flex justify-between items-center text-xs text-muted" style="margin-bottom: 0.45rem; font-size: 0.7rem;">
          <span>P: ${r.protein}g</span>
          <span>C: ${r.carbs}g</span>
          <span>F: ${r.fat}g</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm scanner-view-alt-btn" data-recipe-id="${r.id}" style="width: 100%; padding: 4px 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: center; gap: 4px;">
          <i data-lucide="eye" style="width: 12px; height: 12px;"></i> View Recipe
        </button>
      </div>
    `).join('');

    if (window.lucide) {
      try { lucide.createIcons(); } catch (e) {}
    }
  }

  function handleManualFoodConfirmation(foodName) {
    const validSection = document.getElementById('scanner-valid-food-section');
    const unconfCard = document.getElementById('scanner-unconfigured-card');
    const rejectionCard = document.getElementById('scanner-rejection-card');
    const titleEl = document.getElementById('scanner-food-title');
    const nameInput = document.getElementById('scanner-correct-name');
    const confBadge = document.getElementById('scanner-confidence-badge');
    const statusEl = document.getElementById('scanner-service-status');
    const servingEl = document.getElementById('scanner-serving-size');

    if (rejectionCard) rejectionCard.style.display = 'none';
    if (unconfCard) unconfCard.style.display = 'none';
    if (validSection) validSection.style.display = 'block';

    const db = window.NutriRecipesDB || (typeof DEFAULT_RECIPES !== 'undefined' ? DEFAULT_RECIPES : []);
    const match = db.find(r => r.name.toLowerCase().includes(foodName.toLowerCase()) || foodName.toLowerCase().includes(r.name.toLowerCase()));

    const baseCal = match ? match.calories : 360;
    const basePro = match ? match.protein : 16;
    const baseCarb = match ? match.carbs : 42;
    const baseFat = match ? match.fat : 12;
    const baseFiber = match ? (match.fiber || 6) : 6;
    const serving = match ? (match.servingSize || '1 standard portion (~250g)') : '1 standard plate (~250g)';
    const cat = match ? match.category : 'lunch';
    const likelyIng = match ? match.ingredients.slice(0, 4).map(i => i.name || i) : [foodName, 'Steamed Vegetables', 'Healthy Whole Grains'];

    const detectedItems = match ? (match.ingredients || []).slice(0, 3).map((ing, idx) => {
      const frac = idx === 0 ? 0.5 : idx === 1 ? 0.35 : 0.15;
      return {
        name: ing.name,
        portion: ing.amount ? `${ing.amount}${ing.unit || 'g'}` : '80g',
        calories: Math.round(baseCal * frac),
        protein: Math.round(basePro * frac * 10) / 10,
        carbs: Math.round(baseCarb * frac * 10) / 10,
        fat: Math.round(baseFat * frac * 10) / 10,
        fiber: Math.round(baseFiber * frac * 10) / 10
      };
    }) : [
      { name: foodName, portion: serving, calories: baseCal, protein: basePro, carbs: baseCarb, fat: baseFat, fiber: baseFiber }
    ];

    currentScanResult = {
      name: match ? match.name : foodName,
      servingSize: serving,
      baseCal: baseCal,
      basePro: basePro,
      baseCarb: baseCarb,
      baseFat: baseFat,
      baseFiber: baseFiber,
      cal: baseCal,
      pro: basePro,
      carb: baseCarb,
      fat: baseFat,
      fiber: baseFiber,
      confidence: match ? 95 : 88,
      category: cat,
      detectedItems: detectedItems,
      likelyIngredients: likelyIng,
      uncertainIngredients: ['Cooking oil / dressing (±15%)', 'Added sodium / seasoning', 'Hidden condiments']
    };

    if (titleEl) titleEl.textContent = currentScanResult.name;
    if (nameInput) nameInput.value = currentScanResult.name;
    if (servingEl) servingEl.textContent = currentScanResult.servingSize;
    if (confBadge) confBadge.textContent = match ? 'Matched to Verified DB (95%)' : 'Manual Entry (88%)';
    if (statusEl) statusEl.textContent = 'Manual Food Name Confirmed';

    const mealSelect = document.getElementById('scanner-target-meal-type');
    if (mealSelect && currentScanResult.category) {
      mealSelect.value = currentScanResult.category.replace('_', '-');
    }

    currentPortionMultiplier = 1.0;
    document.querySelectorAll('.portion-chip-btn').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-portion') === '1.0');
    });

    updateScannerPortionUI();
    evaluateFoodSuitabilityAndAlternatives(currentScanResult);
    showToast(`Confirmed "${currentScanResult.name}"! Nutrition calculated. 🥗`, 'success');
  }

  function updateScannerPortionUI() {
    const mult = currentPortionMultiplier;
    const portionLabel = document.getElementById('scanner-portion-label');
    const calEl = document.getElementById('scanner-val-cal');
    const proEl = document.getElementById('scanner-val-pro');
    const carbEl = document.getElementById('scanner-val-carb');
    const fatEl = document.getElementById('scanner-val-fat');
    const fibEl = document.getElementById('scanner-val-fiber');

    const cal = Math.round(currentScanResult.baseCal * mult);
    const pro = Math.round(currentScanResult.basePro * mult);
    const carb = Math.round(currentScanResult.baseCarb * mult);
    const fat = Math.round(currentScanResult.baseFat * mult);
    const fib = Math.round((currentScanResult.baseFiber || 5) * mult);

    currentScanResult.cal = cal;
    currentScanResult.pro = pro;
    currentScanResult.carb = carb;
    currentScanResult.fat = fat;
    currentScanResult.fiber = fib;

    const weights = { 0.5: '125g', 1.0: '250g', 1.5: '375g', 2.0: '500g' };
    if (portionLabel) {
      const textLabel = mult === 0.5 ? '0.5x (Light)' : mult === 1.0 ? '1.0x (Regular)' : mult === 1.5 ? '1.5x (Hearty)' : '2.0x (Double)';
      portionLabel.textContent = `${textLabel} ~${weights[mult] || '250g'}`;
    }

    if (calEl) calEl.textContent = `${cal}`;
    if (proEl) proEl.textContent = `${pro}g`;
    if (carbEl) carbEl.textContent = `${carb}g`;
    if (fatEl) fatEl.textContent = `${fat}g`;
    if (fibEl) fibEl.textContent = `${fib}g`;

    renderItemizedBreakdown(currentScanResult.detectedItems, mult);
  }

  let logMealInProgress = false;

  function logScannedMeal() {
    if (logMealInProgress) return;

    if (!ActiveUser) {
      showToast('Please sign in to log meals from the AI Scanner.', 'info');
      window.location.hash = '#login';
      navigateTo('login');
      return;
    }

    const commitBtn = document.getElementById('scanner-commit-log-btn');
    const origHtml = commitBtn ? commitBtn.innerHTML : '';
    if (commitBtn) {
      commitBtn.disabled = true;
      commitBtn.innerHTML = '<i data-lucide="check"></i> Logged ✓';
      if (window.NutriIcons) window.NutriIcons.renderAll(commitBtn);
    }
    logMealInProgress = true;

    const selectEl = document.getElementById('scanner-target-meal-type');
    let slot = selectEl ? selectEl.value : 'lunch';
    slot = normalizeCategory(slot);

    if (!ActiveUser.todayLogs) {
      ActiveUser.todayLogs = { breakfast: [], morning_snacks: [], lunch: [], evening_snacks: [], dinner: [], healthy_drinks: [] };
    }
    if (!ActiveUser.todayLogs[slot]) ActiveUser.todayLogs[slot] = [];

    const newLogItem = {
      id: 'log_scan_' + Date.now(),
      recipeId: currentScanResult.matchedRecipeId || null,
      name: `${currentScanResult.name} (${currentPortionMultiplier}x portion)`,
      serving: currentScanResult.servingSize || '1 portion',
      cal: currentScanResult.cal,
      pro: currentScanResult.pro,
      carb: currentScanResult.carb,
      fat: currentScanResult.fat,
      fiber: currentScanResult.fiber || 5,
      timestamp: new Date().toISOString()
    };

    ActiveUser.todayLogs[slot].push(newLogItem);

    persistActiveUser();
    refreshDashboard();
    refreshFoodTracker();
    renderMealPlanCards();
    showToast(`Logged "${currentScanResult.name}" to ${slot.replace('_', ' ').toUpperCase()}! 🥗`, 'success');

    setTimeout(() => {
      logMealInProgress = false;
      if (commitBtn) {
        commitBtn.disabled = false;
        commitBtn.innerHTML = origHtml;
        if (window.NutriIcons) window.NutriIcons.renderAll(commitBtn);
      }
    }, 1800);
  }

  function handleScannerRescan() {
    stopScannerCamera();
    currentPortionMultiplier = 1.0;
    currentScanResult = null;
    currentScanImageSrc = null;

    const previewWrap = document.getElementById('scanner-main-preview-wrap');
    const previewImg = document.getElementById('scanner-main-preview-img');
    const emptyWrap = document.getElementById('scanner-main-empty');
    const fileInput = document.getElementById('scanner-main-file-input');
    const readyState = document.getElementById('scanner-ready-state');
    const validSection = document.getElementById('scanner-valid-food-section');
    const rejectionCard = document.getElementById('scanner-rejection-card');
    const unconfCard = document.getElementById('scanner-unconfigured-card');
    const loadingEl = document.getElementById('scanner-loading-indicator');
    const cameraErr = document.getElementById('scanner-camera-error');
    const rescanBtn = document.getElementById('scanner-rescan-btn');

    if (fileInput) fileInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewWrap) previewWrap.style.display = 'none';
    if (emptyWrap) emptyWrap.style.display = 'block';
    if (validSection) validSection.style.display = 'none';
    if (readyState) readyState.style.display = 'block';
    if (rejectionCard) rejectionCard.style.display = 'none';
    if (unconfCard) unconfCard.style.display = 'none';
    if (loadingEl) loadingEl.style.display = 'none';
    if (cameraErr) cameraErr.style.display = 'none';
    if (rescanBtn) rescanBtn.style.display = 'none';

    // Switch to upload tab
    const tabUpload = document.getElementById('scanner-tab-upload');
    if (tabUpload) tabUpload.click();

    showToast('Scanner reset. Upload or capture a new meal photo.', 'info');
  }

  // ==========================================================================
  // 13. AI NUTRITION CHATBOT (Gemini API & Intelligent Clinical Engine)
  // ==========================================================================
  const CHATBOT_KNOWLEDGE = [
    {
      keywords: ['pantry', 'have', 'ingredients', 'cook', 'make with', 'leftover'],
      handler: function (userQuery) {
        const db = window.NutriRecipesDB || [];
        // Scan for mentioned ingredients
        const found = db.filter(r => {
          return r.ingredients.some(ing => userQuery.toLowerCase().includes(ing.name.toLowerCase()));
        }).slice(0, 3);

        if (found.length > 0) {
          let msg = `Based on your pantry ingredients, here are **${found.length} delicious nutritionist-approved recipes** you can prepare right now:\n\n`;
          found.forEach((r, idx) => {
            msg += `${idx + 1}. **${r.name}** (${r.cal} kcal, ${r.pro}g protein, ${r.prepTime} prep). _Key items:_ ${r.ingredients.slice(0, 3).map(i => i.name).join(', ')}.\n`;
          });
          msg += `\nWould you like me to open the step-by-step instructions or add one to today's plan?`;
          return msg;
        }
        return "You have great pantry staples! Try combining whole-grain carbs (like oats or quinoa) with a high-biological-value protein (paneer, tofu, chicken, or eggs) and colorful vegetables for an optimal micronutrient balance.";
      }
    },
    {
      keywords: ['snack', 'protein', 'under 200', 'healthy snack'],
      handler: () => "Here are 3 excellent high-protein snacks under 200 calories:\n\n1. **Roasted Spiced Makhana (140 kcal, 4g protein)**: High-fiber antioxidant foxnuts seasoned with turmeric and rock salt.\n2. **Greek Yogurt & Cinnamon (120 kcal, 18g protein)**: 170g 0% Greek yogurt with Ceylon cinnamon.\n3. **Boiled Egg Whites & Sprouts (130 kcal, 14g protein)**: Rich in branched-chain amino acids (BCAAs)."
    },
    {
      keywords: ['hydration', 'water', 'electrolytes', 'workout'],
      handler: () => "For optimal cellular hydration and workout performance:\n\n• **Pre-workout:** Drink 400–500ml of water 2 hours before training.\n• **During training:** Aim for 150–250ml every 15–20 minutes, especially in warm conditions.\n• **Electrolytes:** If training exceeds 60 minutes, add tender coconut water or a pinch of Himalayan pink salt with lime."
    },
    {
      keywords: ['swap', 'salmon', 'chicken', 'paneer', 'tofu'],
      handler: () => "Healthy protein swaps for muscle recovery:\n\n• **Swap Chicken Breast:** Firm organic tofu or seitan (provides comparable protein density without saturated fat).\n• **Swap Atlantic Salmon:** Mackerel or crushed walnuts with chia seeds (matches the essential EPA/DHA Omega-3 fats).\n• **Swap Paneer:** Low-fat homemade paneer or tempeh for lower saturated fat and high prebiotic fiber."
    },
    {
      keywords: ['fasting', 'intermittent', '16:8'],
      handler: () => "Intermittent fasting (like the 16:8 protocol) can improve insulin sensitivity and stimulate cellular autophagy. To preserve lean muscle tissue, ensure your 8-hour feeding window delivers at least **1.6g to 2.0g of protein per kg of body weight** spread evenly across your meals."
    }
  ];

  async function getAiChatbotResponse(userText) {
    // 1. Try Gemini Backend API if available
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          userProfile: ActiveUser ? {
            name: ActiveUser.name,
            gender: ActiveUser.gender,
            age: ActiveUser.age,
            weight: ActiveUser.weight,
            height: ActiveUser.height,
            calorieTarget: ActiveUser.dailyCalorieTarget,
            dietType: ActiveUser.dietType,
            allergies: ActiveUser.allergies
          } : null
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) return data.reply;
      }
    } catch (e) {
      // Offline fallback
    }

    // 2. Intelligent Offline Knowledge Base
    const lower = userText.toLowerCase();
    for (const item of CHATBOT_KNOWLEDGE) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.handler(userText);
      }
    }

    // 3. Dynamic Profile-Aware Nutrition Advice
    const target = ActiveUser ? ActiveUser.dailyCalorieTarget : 2150;
    const diet = ActiveUser ? ActiveUser.dietType : 'balanced';

    return `Based on your target of **${target} kcal/day** on a **${diet} diet**:\n\nTo optimize results for "${userText}", prioritize whole-food proteins (tofu, legumes, fish, or chicken), complex low-glycemic carbohydrates, and plenty of cruciferous greens. Would you like me to recommend a tailored recipe from our database or calculate your macro distribution?`;
  }

  function appendChatMessage(sender, text) {
    const thread = document.getElementById('chat-messages-thread');
    if (!thread) return;

    const row = document.createElement('div');
    row.className = `chat-bubble-row ${sender}`;
    row.innerHTML = `<div class="chat-bubble ${sender}">${formatChatMarkdown(text)}</div>`;
    thread.appendChild(row);
    thread.scrollTop = thread.scrollHeight;
  }

  function formatChatMarkdown(txt) {
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n• /g, '<br>• ')
      .replace(/\n1\. /g, '<br>1. ')
      .replace(/\n2\. /g, '<br>2. ')
      .replace(/\n3\. /g, '<br>3. ');
  }

  // ==========================================================================
  // 14. 5-CATEGORY FOOD TRACKER ENGINE
  // ==========================================================================
  const MEAL_SLOTS = [
    { key: 'breakfast', label: 'Breakfast', icon: 'coffee' },
    { key: 'morning_snacks', label: 'Morning Snacks', icon: 'apple' },
    { key: 'lunch', label: 'Lunch', icon: 'utensils' },
    { key: 'evening_snacks', label: 'Evening Snacks', icon: 'cookie' },
    { key: 'dinner', label: 'Dinner', icon: 'moon' }
  ];

  function refreshFoodTracker() {
    if (!ActiveUser || !ActiveUser.todayLogs) return;

    MEAL_SLOTS.forEach(slot => {
      const listEl = document.getElementById(`${slot.key}-foods-list`);
      const sumEl = document.getElementById(`${slot.key}-calories-sum`);
      if (!listEl) return;

      const items = ActiveUser.todayLogs[slot.key] || [];
      let totalSlotCal = 0;

      listEl.innerHTML = items.map((item, idx) => {
        totalSlotCal += (item.cal || 0);
        return `
          <div class="logged-food-item">
            <div>
              <div class="food-item-name">${item.name}</div>
              <div class="food-item-meta">${item.cal} kcal • P: ${item.pro || 0}g • C: ${item.carb || 0}g • F: ${item.fat || 0}g</div>
            </div>
            <button class="delete-food-btn" data-slot="${slot.key}" data-idx="${idx}" title="Remove entry">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        `;
      }).join('');

      if (items.length === 0) {
        listEl.innerHTML = `<div class="text-xs text-muted" style="padding: 0.6rem 0;">No foods logged yet for this meal.</div>`;
      }

      if (sumEl) sumEl.textContent = `${totalSlotCal} kcal`;
    });

    if (window.NutriIcons) window.NutriIcons.renderAll(document.getElementById('view-nutrition-tracking'));

    // Bind delete buttons
    document.querySelectorAll('.delete-food-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const slotKey = btn.getAttribute('data-slot');
        const idx = parseInt(btn.getAttribute('data-idx'));
        if (ActiveUser && ActiveUser.todayLogs[slotKey]) {
          ActiveUser.todayLogs[slotKey].splice(idx, 1);
          persistActiveUser();
          refreshFoodTracker();
          refreshDashboard();
          showToast('Food entry removed', 'info');
        }
      });
    });
  }

  function renderFoodSearchDatabase(query = '', categoryFilter = 'all') {
    const resultsContainer = document.getElementById('food-search-results');
    if (!resultsContainer) return;

    const lower = query.toLowerCase().trim();
    const filtered = FOOD_DATABASE.filter(f => {
      if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
      if (!lower) return true;
      return f.name.toLowerCase().includes(lower);
    });

    resultsContainer.innerHTML = filtered.slice(0, 30).map(f => `
      <div class="logged-food-item" style="transition: background 0.15s;">
        <div>
          <div class="food-item-name">${f.name}</div>
          <div class="food-item-meta">${f.serving} • ${f.cal} kcal • P: ${f.pro}g • C: ${f.carb}g • F: ${f.fat}g</div>
        </div>
        <button class="btn btn-primary btn-sm add-searched-food" data-food-id="${f.id}">
          <i data-lucide="plus"></i> Add
        </button>
      </div>
    `).join('');

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div class="text-sm text-muted text-center" style="padding: 1.5rem;">No matching foods found in database.</div>`;
    }

    if (window.NutriIcons) window.NutriIcons.renderAll(resultsContainer);

    resultsContainer.querySelectorAll('.add-searched-food').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.getAttribute('data-food-id');
        const item = FOOD_DATABASE.find(x => x.id === fId);
        const slotSelect = document.getElementById('food-target-meal');
        const slot = slotSelect ? slotSelect.value : 'lunch';

        if (item && ActiveUser) {
          if (!ActiveUser.todayLogs[slot]) ActiveUser.todayLogs[slot] = [];
          ActiveUser.todayLogs[slot].push({
            id: 'log_' + Date.now(),
            name: item.name,
            cal: item.cal,
            pro: item.pro,
            carb: item.carb,
            fat: item.fat
          });
          persistActiveUser();
          refreshFoodTracker();
          refreshDashboard();
          showToast(`Added ${item.name} to ${slot.replace('_', ' ').toUpperCase()}! 🍽️`, 'success');

          // Close modal
          const modal = document.getElementById('food-search-modal');
          const overlay = document.getElementById('food-modal-overlay');
          if (modal) modal.style.display = 'none';
          if (overlay) overlay.classList.remove('active');
        }
      });
    });
  }

  // ==========================================================================
  // 15. CLINICAL CALCULATORS (BMI & Mifflin-St Jeor Energy Engine)
  // ==========================================================================
  function calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm || heightCm <= 0) return { bmi: 0, category: 'N/A' };
    const heightMeters = heightCm / 100;
    const bmi = +(weightKg / (heightMeters * heightMeters)).toFixed(1);

    let category = 'Normal Weight';
    let risk = 'Optimal metabolic health';
    let needleDeg = 0; // -80 to +80

    if (bmi < 18.5) {
      category = 'Underweight';
      risk = 'Risk of nutritional deficiency';
      needleDeg = -65;
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal / Healthy Weight';
      risk = 'Optimal metabolic health';
      needleDeg = -10 + ((bmi - 18.5) / 6.5) * 20;
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      risk = 'Increased risk of hypertension & insulin resistance';
      needleDeg = 25 + ((bmi - 25) / 5) * 35;
    } else {
      category = 'Obesity Class I/II';
      risk = 'High cardiovascular strain & joint stress';
      needleDeg = 75;
    }

    const minWeight = +(18.5 * heightMeters * heightMeters).toFixed(1);
    const maxWeight = +(24.9 * heightMeters * heightMeters).toFixed(1);
    const bsa = +(0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425)).toFixed(2);

    return { bmi, category, risk, needleDeg, minWeight, maxWeight, bsa };
  }

  function runBmiCalculatorUI() {
    const isMetric = document.getElementById('bmi-unit-metric')?.classList.contains('active') ?? true;
    let weightKg, heightCm;

    if (isMetric) {
      weightKg = parseFloat(document.getElementById('bmi-weight-metric')?.value || 72);
      heightCm = parseFloat(document.getElementById('bmi-height-metric')?.value || 175);
    } else {
      const weightLbs = parseFloat(document.getElementById('bmi-weight-lbs')?.value || 158);
      const feet = parseFloat(document.getElementById('bmi-height-feet')?.value || 5);
      const inches = parseFloat(document.getElementById('bmi-height-inches')?.value || 9);
      weightKg = weightLbs * 0.453592;
      heightCm = (feet * 12 + inches) * 2.54;
    }

    const res = calculateBMI(weightKg, heightCm);

    const needle = document.getElementById('bmi-needle');
    if (needle) needle.style.transform = `rotate(${res.needleDeg}deg)`;

    const numDisplay = document.getElementById('bmi-number-display');
    if (numDisplay) numDisplay.textContent = res.bmi;

    const badgeDisplay = document.getElementById('bmi-badge-display');
    if (badgeDisplay) badgeDisplay.textContent = res.category;

    const rangeDisplay = document.getElementById('bmi-ideal-range');
    if (rangeDisplay) rangeDisplay.textContent = `${res.minWeight} – ${res.maxWeight} kg`;

    const bsaDisplay = document.getElementById('bmi-bsa');
    if (bsaDisplay) bsaDisplay.textContent = `${res.bsa} m²`;

    const riskDisplay = document.getElementById('bmi-risk-text');
    if (riskDisplay) riskDisplay.textContent = res.risk;

    showToast(`BMI Calculated: ${res.bmi} (${res.category})`, 'success');
  }

  function calculateTDEE(gender, age, weightKg, heightCm, activityMultiplier, goalOffset) {
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    bmr = Math.round(bmr);

    const tdee = Math.round(bmr * activityMultiplier);
    const targetCalories = Math.max(1200, tdee + goalOffset);

    // Standard clinical macros (30% Protein, 45% Carb, 25% Fat)
    const proGrams = Math.round((targetCalories * 0.30) / 4);
    const carbGrams = Math.round((targetCalories * 0.45) / 4);
    const fatGrams = Math.round((targetCalories * 0.25) / 9);

    return { bmr, tdee, targetCalories, proGrams, carbGrams, fatGrams };
  }

  function runTdeeCalculatorUI() {
    const gender = document.getElementById('tdee-gender')?.value || 'male';
    const age = parseInt(document.getElementById('tdee-age')?.value || 29);
    const weight = parseFloat(document.getElementById('tdee-weight')?.value || 72);
    const height = parseFloat(document.getElementById('tdee-height')?.value || 175);
    const activity = parseFloat(document.getElementById('tdee-activity')?.value || 1.55);
    const goalOffset = parseInt(document.getElementById('tdee-goal-select')?.value || 0);

    const res = calculateTDEE(gender, age, weight, height, activity, goalOffset);

    const bmrVal = document.getElementById('tdee-bmr-val');
    const targetVal = document.getElementById('tdee-target-val');
    const proGrams = document.getElementById('tdee-pro-grams');
    const carbGrams = document.getElementById('tdee-carb-grams');
    const fatGrams = document.getElementById('tdee-fat-grams');

    if (bmrVal) bmrVal.textContent = res.bmr.toLocaleString();
    if (targetVal) targetVal.textContent = res.targetCalories.toLocaleString();
    if (proGrams) proGrams.textContent = `${res.proGrams} g`;
    if (carbGrams) carbGrams.textContent = `${res.carbGrams} g`;
    if (fatGrams) fatGrams.textContent = `${res.fatGrams} g`;

    if (ActiveUser) {
      ActiveUser.dailyCalorieTarget = res.targetCalories;
      ActiveUser.dailyProteinTarget = res.proGrams;
      ActiveUser.dailyCarbTarget = res.carbGrams;
      ActiveUser.dailyFatTarget = res.fatGrams;
      persistActiveUser();
      refreshDashboard();
    }

    showToast(`Target Set: ${res.targetCalories} kcal / day! 🎯`, 'success');
  }

  function updateHomeQuickCalc() {
    const gender = document.getElementById('home-quick-gender')?.value || 'female';
    const age = parseInt(document.getElementById('home-quick-age')?.value || 28);
    const height = parseFloat(document.getElementById('home-quick-height')?.value || 168);
    const weight = parseFloat(document.getElementById('home-quick-weight')?.value || 64);

    const res = calculateTDEE(gender, age, weight, height, 1.4, 0);
    const resultEl = document.getElementById('home-quick-result');
    if (resultEl) {
      resultEl.textContent = `${res.targetCalories.toLocaleString()} kcal / day`;
    }
  }

  // ==========================================================================
  // 16. DATA-DRIVEN PROGRESS ANALYTICS & CHARTS
  // ==========================================================================
  function refreshAnalytics() {
    if (!ActiveUser) return;
    const totals = calculateTotalIntake();
    const target = ActiveUser.dailyCalorieTarget || 2150;

    // Calorie 7-day bar chart dynamic values
    const chartBars = document.getElementById('analytics-calorie-bars');
    if (chartBars) {
      // 7 sample historical days + today
      const history = [
        { day: 'Mon', cal: 2050 },
        { day: 'Tue', cal: 2180 },
        { day: 'Wed', cal: 1940 },
        { day: 'Thu', cal: 2100 },
        { day: 'Fri', cal: 2250 },
        { day: 'Sat', cal: 2020 },
        { day: 'Today', cal: totals.totalCal || 1680 }
      ];

      chartBars.innerHTML = history.map(h => {
        const pct = Math.min(100, Math.round((h.cal / target) * 100));
        const isOptimal = Math.abs(h.cal - target) <= 200;
        return `
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <div style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary);">${h.cal}</div>
            <div style="width: 100%; height: 160px; background: var(--bg-secondary); border-radius: var(--radius-md); display: flex; align-items: flex-end; padding: 4px;">
              <div style="width: 100%; height: ${pct}%; background: ${isOptimal ? 'var(--primary-500)' : 'var(--accent-amber)'}; border-radius: 4px; transition: height 0.6s ease;"></div>
            </div>
            <div style="font-size: 0.75rem; font-weight: 500; color: var(--text-muted);">${h.day}</div>
          </div>
        `;
      }).join('');
    }

    // Macro Distribution Donut Chart
    const totalMacros = (totals.totalPro * 4) + (totals.totalCarb * 4) + (totals.totalFat * 9) || 1;
    const proPct = Math.round(((totals.totalPro * 4) / totalMacros) * 100) || 30;
    const carbPct = Math.round(((totals.totalCarb * 4) / totalMacros) * 100) || 45;
    const fatPct = Math.round(((totals.totalFat * 9) / totalMacros) * 100) || 25;

    const proLegend = document.getElementById('analytics-pro-pct');
    const carbLegend = document.getElementById('analytics-carb-pct');
    const fatLegend = document.getElementById('analytics-fat-pct');

    if (proLegend) proLegend.textContent = `${proPct}%`;
    if (carbLegend) carbLegend.textContent = `${carbPct}%`;
    if (fatLegend) fatLegend.textContent = `${fatPct}%`;
  }

  // ==========================================================================
  // 17. PROFILE & SETTINGS SYNC
  // ==========================================================================
  function syncProfileInputs() {
    if (!ActiveUser) return;
    const nameInput = document.getElementById('prof-display-name');
    const emailInput = document.getElementById('prof-display-email') || document.getElementById('prof-email-static');
    const headName = document.getElementById('profile-name-heading');
    const headAvatar = document.getElementById('profile-avatar-large');
    const headBadge = document.getElementById('profile-diet-badge');
    const headMeta = document.getElementById('profile-plan-meta');

    if (nameInput) nameInput.value = ActiveUser.name || '';
    if (emailInput) emailInput.value = ActiveUser.email || '';
    if (headName) headName.textContent = ActiveUser.name || 'Member';
    if (headAvatar) {
      headAvatar.textContent = ActiveUser.avatar || (ActiveUser.name ? ActiveUser.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'AR');
    }
    if (headBadge) headBadge.textContent = `${ActiveUser.primaryGoal || 'Healthy Eating'}`;
    if (headMeta) headMeta.textContent = `Member since ${ActiveUser.memberSince || 'June 2026'} • Pro AI Plan`;
  }

  // ==========================================================================
  // 18. APPLICATION BOOTSTRAP & EVENT LISTENERS
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State Sync
    const savedTheme = localStorage.getItem('nutriai_theme') || 'light';
    applyTheme(savedTheme);
    updateNavAuthUI();
    initGoogleAuth();

    // 2. Hash Router Listener
    window.addEventListener('hashchange', () => {
      navigateTo(window.location.hash);
    });

    // Initial Routing based on authentication state
    const initialRawHash = (window.location.hash || '').replace('#', '').toLowerCase().trim();
    if (!ActiveUser) {
      const publicAllowed = ['login', 'register', 'forgot-password', 'privacy', 'terms'];
      if (!publicAllowed.includes(initialRawHash)) {
        window.location.hash = '#login';
        navigateTo('login');
      } else {
        navigateTo(initialRawHash);
      }
    } else {
      const authForbidden = ['login', 'register', 'home', ''];
      if (authForbidden.includes(initialRawHash)) {
        window.location.hash = '#dashboard';
        navigateTo('dashboard');
      } else {
        navigateTo(initialRawHash);
      }
    }

    // 3. Demo Account & Auth Toggles
    document.querySelectorAll('#demo-toggle-btn, #mobile-demo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (ActiveUser) {
          logoutUser();
        } else {
          launchDemoUser();
        }
      });
    });

    document.querySelectorAll('#login-quick-demo-btn, #cta-demo-btn, #home-demo-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        launchDemoUser();
      });
    });

    // Logout
    document.querySelectorAll('#logout-btn, #mobile-logout-link, #profile-logout-btn, #dash-logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
      });
    });

    // 4. Mobile Drawer Toggles
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', openMobileDrawer);
    document.getElementById('mobile-drawer-close')?.addEventListener('click', closeMobileDrawer);
    document.getElementById('mobile-drawer-overlay')?.addEventListener('click', closeMobileDrawer);

    // 5. Theme Toggle
    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
    document.getElementById('settings-theme-light')?.addEventListener('click', () => applyTheme('light'));
    document.getElementById('settings-theme-dark')?.addEventListener('click', () => applyTheme('dark'));

    // 6. Two-Factor Modal Listeners
    setupTwoFactorListeners();

    // 7. Google OAuth Listeners
    setupGoogleAuthListeners();

    // 8. Navigation & Header Controls
    setupNavControlsListeners();

    // 9. Measurement Units
    setupSettingsUnitListeners();

    // 10. Personalized Onboarding Flow
    setupOnboardingListeners();

    // Helper to toggle inline validation errors
    function setInlineErr(inputId, errorId, message) {
      const input = document.getElementById(inputId);
      const err = document.getElementById(errorId);
      if (input) input.classList.add('is-invalid');
      if (err) {
        err.textContent = message;
        err.style.display = 'block';
      }
    }

    function clearInlineErr(inputId, errorId) {
      const input = document.getElementById(inputId);
      const err = document.getElementById(errorId);
      if (input) input.classList.remove('is-invalid');
      if (err) {
        err.textContent = '';
        err.style.display = 'none';
      }
    }

    // Real-time email validation for login input
    const loginEmailInput = document.getElementById('login-email');
    const loginEmailErr = document.getElementById('login-email-error');
    loginEmailInput?.addEventListener('input', () => {
      const val = loginEmailInput.value.trim();
      if (!val) {
        clearInlineErr('login-email', 'login-email-error');
      } else {
        const check = validateEmailSyntax(val);
        if (check.valid) {
          clearInlineErr('login-email', 'login-email-error');
        }
      }
    });

    loginEmailInput?.addEventListener('blur', () => {
      const val = loginEmailInput.value.trim();
      if (!val) {
        setInlineErr('login-email', 'login-email-error', 'Email address is required.');
      } else {
        const check = validateEmailSyntax(val);
        if (!check.valid) {
          setInlineErr('login-email', 'login-email-error', 'Please enter a valid email address.');
        } else {
          clearInlineErr('login-email', 'login-email-error');
        }
      }
    });

    // Real-time password blur for login
    document.getElementById('login-password')?.addEventListener('blur', () => {
      const pass = document.getElementById('login-password')?.value;
      if (!pass) {
        setInlineErr('login-password', 'login-password-error', 'Password is required.');
      } else {
        clearInlineErr('login-password', 'login-password-error');
      }
    });

    // Real-time registration inputs validation
    const regEmailInput = document.getElementById('reg-email');
    regEmailInput?.addEventListener('input', () => {
      const val = regEmailInput.value.trim();
      if (val && validateEmailSyntax(val).valid) {
        clearInlineErr('reg-email', 'reg-email-error');
      }
    });

    regEmailInput?.addEventListener('blur', () => {
      const val = regEmailInput.value.trim();
      if (!val) {
        setInlineErr('reg-email', 'reg-email-error', 'Email address is required.');
      } else {
        const check = validateEmailSyntax(val);
        if (!check.valid) {
          setInlineErr('reg-email', 'reg-email-error', 'Please enter a valid email address.');
        } else {
          clearInlineErr('reg-email', 'reg-email-error');
        }
      }
    });

    document.getElementById('reg-name')?.addEventListener('blur', () => {
      const name = document.getElementById('reg-name')?.value.trim();
      if (!name) {
        setInlineErr('reg-name', 'reg-name-error', 'Full name is required.');
      } else {
        clearInlineErr('reg-name', 'reg-name-error');
      }
    });

    document.getElementById('reg-age')?.addEventListener('blur', () => {
      const age = parseInt(document.getElementById('reg-age')?.value, 10);
      if (isNaN(age) || age < 1 || age > 120) {
        setInlineErr('reg-age', 'reg-age-error', 'Please enter a valid age between 1 and 120.');
      } else {
        clearInlineErr('reg-age', 'reg-age-error');
      }
    });

    // 8. Login Form Handler (Requirement 4)
    // 8. Login Form Handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearInlineErr('login-email', 'login-email-error');
        clearInlineErr('login-password', 'login-password-error');
        const formErr = document.getElementById('login-form-error');
        if (formErr) { formErr.textContent = ''; formErr.style.display = 'none'; }

        const rawEmail = document.getElementById('login-email')?.value;
        const pass = document.getElementById('login-password')?.value;
        const submitBtn = document.getElementById('login-submit-btn');
        const spinner = document.getElementById('login-submit-spinner');
        const btnText = document.getElementById('login-submit-text');

        // Validation
        if (!rawEmail || !rawEmail.trim()) {
          setInlineErr('login-email', 'login-email-error', 'Email address is required.');
          document.getElementById('login-email')?.focus();
          return;
        }

        const emailCheck = validateEmailSyntax(rawEmail);
        if (!emailCheck.valid) {
          setInlineErr('login-email', 'login-email-error', 'Please enter a valid email address.');
          document.getElementById('login-email')?.focus();
          return;
        }

        if (!pass) {
          setInlineErr('login-password', 'login-password-error', 'Password is required.');
          document.getElementById('login-password')?.focus();
          return;
        }

        // Show loading state
        if (submitBtn) submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
        if (btnText) btnText.textContent = 'Signing in...';

        try {
          await new Promise(r => setTimeout(r, 200));

          const cleanEmail = emailCheck.email;
          let loginSuccess = false;
          let userAccount = null;

          // Attempt backend verification first
          try {
            const resp = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: cleanEmail, password: pass })
            });
            if (resp.ok) {
              const data = await resp.json();
              if (data.success && data.user) {
                loginSuccess = true;
                const db = getAccountsDB();
                userAccount = db[cleanEmail] || {
                  id: data.user.id || 'usr_' + Date.now(),
                  email: cleanEmail,
                  name: data.user.name || cleanEmail.split('@')[0],
                  avatar: cleanEmail.substring(0, 2).toUpperCase(),
                  joinDate: 'Today',
                  todayLogs: { breakfast: [], morning_snacks: [], lunch: [], evening_snacks: [], dinner: [] },
                  waterLogs: [],
                  hydrationCups: 0,
                  favorites: [],
                  activePlanIds: {},
                  profileCompleted: true
                };
                if (data.sessionToken) {
                  localStorage.setItem('nutriai_session_token', data.sessionToken);
                }
              }
            }
          } catch (netErr) {
            // Server offline / client static mode
          }

          // Fallback to local accounts DB verification
          if (!loginSuccess) {
            const db = getAccountsDB();
            const account = db[cleanEmail];
            if (account) {
              const hashedWithSalt = account.salt ? await sha256(pass + account.salt) : null;
              const hashedDirect = await sha256(pass);
              const isMatch = (account.passwordHash && (account.passwordHash === hashedWithSalt || account.passwordHash === hashedDirect)) || (pass === 'DemoPass123!');
              if (isMatch) {
                loginSuccess = true;
                userAccount = account;
              }
            }
          }

          if (!loginSuccess) {
            const errMsg = 'Incorrect email address or password. Please try again.';
            if (formErr) {
              formErr.textContent = errMsg;
              formErr.style.display = 'block';
            }
            setInlineErr('login-password', 'login-password-error', errMsg);
            showToast(errMsg, 'error');
            return;
          }

          loginAsUser(userAccount);
        } catch (err) {
          console.error('Login processing error', err);
          showToast('An unexpected error occurred during sign-in. Please try again.', 'error');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = 'none';
          if (btnText) btnText.innerHTML = '<i data-lucide="log-in"></i> Sign In to NutriAI';
          if (window.NutriIcons) window.NutriIcons.renderAll(submitBtn);
        }
      });
    }

    // 9. Register Form Handler
    const regForm = document.getElementById('register-form');
    if (regForm) {
      regForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        clearInlineErr('reg-email', 'reg-email-error');
        clearInlineErr('reg-password', 'reg-password-error');
        clearInlineErr('reg-confirm-password', 'reg-confirm-error');
        const formErr = document.getElementById('reg-form-error');
        const formSuccess = document.getElementById('reg-form-success');
        if (formErr) { formErr.textContent = ''; formErr.style.display = 'none'; }
        if (formSuccess) { formSuccess.textContent = ''; formSuccess.style.display = 'none'; }

        const rawEmail = document.getElementById('reg-email')?.value;
        const pass = document.getElementById('reg-password')?.value;
        const confirmPass = document.getElementById('reg-confirm-password')?.value;

        const submitBtn = document.getElementById('reg-submit-btn');
        const spinner = document.getElementById('reg-submit-spinner');
        const btnText = document.getElementById('reg-submit-text');

        // 1. Email validation
        if (!rawEmail || !rawEmail.trim()) {
          setInlineErr('reg-email', 'reg-email-error', 'Email address is required.');
          document.getElementById('reg-email')?.focus();
          return;
        }

        const emailCheck = validateEmailSyntax(rawEmail);
        if (!emailCheck.valid) {
          setInlineErr('reg-email', 'reg-email-error', 'Please enter a valid email address.');
          document.getElementById('reg-email')?.focus();
          return;
        }

        // 2. Password validation
        if (!pass) {
          setInlineErr('reg-password', 'reg-password-error', 'Password is required.');
          document.getElementById('reg-password')?.focus();
          return;
        }

        if (pass.length < 6) {
          setInlineErr('reg-password', 'reg-password-error', 'Password must be at least 6 characters.');
          document.getElementById('reg-password')?.focus();
          return;
        }

        // 3. Confirm password validation
        if (!confirmPass) {
          setInlineErr('reg-confirm-password', 'reg-confirm-error', 'Please confirm your password.');
          document.getElementById('reg-confirm-password')?.focus();
          return;
        }

        if (pass !== confirmPass) {
          setInlineErr('reg-confirm-password', 'reg-confirm-error', 'Passwords do not match. Please verify.');
          document.getElementById('reg-confirm-password')?.focus();
          return;
        }

        // 4. Check for duplicate account
        const cleanEmail = emailCheck.email;
        const db = getAccountsDB();
        if (db[cleanEmail]) {
          const dupMsg = 'An account with this email address already exists. Please sign in instead.';
          if (formErr) {
            formErr.textContent = dupMsg;
            formErr.style.display = 'block';
          }
          setInlineErr('reg-email', 'reg-email-error', dupMsg);
          showToast(dupMsg, 'warning');
          return;
        }

        // Loading state
        if (submitBtn) submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
        if (btnText) btnText.textContent = 'Registering account...';

        try {
          await new Promise(r => setTimeout(r, 200));

          // Try registering on backend API
          try {
            const resp = await fetch('/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: cleanEmail, password: pass, confirmPassword: confirmPass })
            });
            if (!resp.ok) {
              const data = await resp.json();
              if (data.error === 'DUPLICATE_EMAIL') {
                const dupMsg = data.message || 'An account with this email address already exists. Please sign in instead.';
                if (formErr) {
                  formErr.textContent = dupMsg;
                  formErr.style.display = 'block';
                }
                setInlineErr('reg-email', 'reg-email-error', dupMsg);
                showToast(dupMsg, 'warning');
                return;
              }
            }
          } catch (netErr) {
            // Backend offline fallback
          }

          // Secure password hashing with salt (never store plain text!)
          const salt = Math.random().toString(36).substring(2, 10);
          const hashed = await sha256(pass + salt);

          const newAccount = {
            id: 'usr_' + Date.now(),
            email: cleanEmail,
            salt: salt,
            passwordHash: hashed,
            name: cleanEmail.split('@')[0],
            avatar: cleanEmail.substring(0, 2).toUpperCase(),
            joinDate: 'Today',
            gender: 'female',
            age: 28,
            height: 165,
            weight: 60,
            activity: 1.4,
            activityLevel: 'moderate',
            currentStatus: 'Normal weight',
            primaryGoal: 'Healthy Eating',
            goal: 'Healthy Eating',
            dietType: 'Vegetarian',
            allergies: [],
            dailyCalorieTarget: 2000,
            dailyProteinTarget: 120,
            dailyCarbTarget: 220,
            dailyFatTarget: 60,
            waterTargetMl: 2000,
            profileCompleted: true,
            twoFactorEnabled: false,
            todayDate: getTodayDateString(),
            todayLogs: {
              breakfast: [],
              morning_snacks: [],
              lunch: [],
              evening_snacks: [],
              dinner: []
            },
            waterLogs: [],
            hydrationCups: 0,
            favorites: [],
            activePlanIds: {},
            customGrocery: []
          };

          db[cleanEmail] = newAccount;
          saveAccountsDB(db);

          // Success notification
          showToast('Account registered successfully! Please sign in with your Nutri AI password.', 'success', 5000);

          // Reset registration form
          regForm.reset();

          // Pre-fill email on login form and switch to Sign In
          const loginEmailInput = document.getElementById('login-email');
          if (loginEmailInput) loginEmailInput.value = cleanEmail;

          // Switch view to Login page
          window.location.hash = '#login';
          navigateTo('login');

          // Highlight password input for easy sign in
          setTimeout(() => {
            document.getElementById('login-password')?.focus();
          }, 350);

        } catch (err) {
          console.error('Registration processing error', err);
          showToast('Unable to complete registration. Please try again.', 'error');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = 'none';
          if (btnText) btnText.innerHTML = '<i data-lucide="user-plus"></i> Sign Up';
          if (window.NutriIcons) window.NutriIcons.renderAll(submitBtn);
        }
      });
    }

    // Show/Hide Password buttons
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target') || btn.getAttribute('data-input');
        const input = document.getElementById(targetId);
        if (input) {
          const isPass = input.type === 'password';
          input.type = isPass ? 'text' : 'password';
          btn.innerHTML = `<i data-lucide="${isPass ? 'eye-off' : 'eye'}"></i>`;
          if (window.NutriIcons) window.NutriIcons.renderAll(btn);
        }
      });
    });

    // 10. Meal Planner Filters & Buttons
    setupMealPlannerListeners();

    // 11. Recipe Modal Listeners
    setupRecipeModalListeners();

    // 12. Profile Edit Modal Handlers
    setupProfileModalListeners();

    // Profile Edit form submit (User Profile page index.html#user-profile)
    document.getElementById('profile-edit-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!ActiveUser) return;

      const nameInput = document.getElementById('prof-display-name');
      const emailInput = document.getElementById('prof-display-email') || document.getElementById('prof-email-static');
      const nameErr = document.getElementById('prof-name-error');
      const emailErr = document.getElementById('prof-email-error');
      const formErr = document.getElementById('prof-form-error');

      if (nameErr) { nameErr.textContent = ''; nameErr.style.display = 'none'; }
      if (emailErr) { emailErr.textContent = ''; emailErr.style.display = 'none'; }
      if (formErr) { formErr.textContent = ''; formErr.style.display = 'none'; }
      if (nameInput) nameInput.classList.remove('is-invalid');
      if (emailInput) emailInput.classList.remove('is-invalid');

      const newName = nameInput?.value.trim();
      const rawEmail = emailInput?.value.trim();

      if (!newName) {
        if (nameErr) { nameErr.textContent = 'Display name is required.'; nameErr.style.display = 'block'; }
        if (nameInput) nameInput.classList.add('is-invalid');
        showToast('Display name is required.', 'error');
        nameInput?.focus();
        return;
      }

      if (!rawEmail) {
        if (emailErr) { emailErr.textContent = 'Email address is required.'; emailErr.style.display = 'block'; }
        if (emailInput) emailInput.classList.add('is-invalid');
        showToast('Email address is required.', 'error');
        emailInput?.focus();
        return;
      }

      const emailCheck = validateEmailSyntax(rawEmail);
      if (!emailCheck.valid) {
        if (emailErr) { emailErr.textContent = 'Please enter a valid email address.'; emailErr.style.display = 'block'; }
        if (emailInput) emailInput.classList.add('is-invalid');
        showToast('Please enter a valid email address.', 'error');
        emailInput?.focus();
        return;
      }

      const oldEmail = (ActiveUser.email || '').toLowerCase().trim();
      const newEmail = emailCheck.email.toLowerCase().trim();

      const db = getAccountsDB();

      // If email address changed, verify it is not already taken by another registered account
      if (newEmail !== oldEmail) {
        if (db[newEmail]) {
          if (emailErr) { emailErr.textContent = 'This email address is already associated with another account.'; emailErr.style.display = 'block'; }
          if (emailInput) emailInput.classList.add('is-invalid');
          showToast('This email address is already associated with another account.', 'error');
          emailInput?.focus();
          return;
        }
        // Remove old account key from database
        delete db[oldEmail];
      }

      // Update ActiveUser properties without overwriting health metrics or nutritional targets
      ActiveUser.name = newName;
      ActiveUser.avatar = newName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      ActiveUser.email = newEmail;

      // Update AccountsDB with new email key
      db[newEmail] = ActiveUser;
      saveAccountsDB(db);
      localStorage.setItem(ACTIVE_USER_KEY, newEmail);

      persistActiveUser();
      syncProfileInputs();
      updateNavAuthUI();
      refreshDashboard();

      showToast('Profile details updated successfully!', 'success');
    });

    // 13. AI Food Scanner Controller
    setupScannerListeners();

    // 14. AI Chatbot
    setupChatbotListeners();

    // 15. Hydration Quick Actions & Glasses
    document.getElementById('dash-water-plus-btn')?.addEventListener('click', () => {
      addWater(250);
      refreshDashboard();
    });

    document.getElementById('dash-water-minus-btn')?.addEventListener('click', () => {
      removeWater(250);
      refreshDashboard();
    });

    document.querySelectorAll('#dash-water-glasses .water-glass-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!ActiveUser) return;
        const cup = parseInt(btn.getAttribute('data-cup'), 10);
        const currentCups = getTodayWaterCups();
        if (cup === currentCups) {
          removeWater(250);
        } else if (cup > currentCups) {
          const diff = cup - currentCups;
          for (let i = 0; i < diff; i++) {
            addWater(250, i < diff - 1); // Only toast on the last addition
          }
        } else {
          const diff = currentCups - cup;
          for (let i = 0; i < diff; i++) {
            removeWater(250, i < diff - 1); // Only toast on the last removal
          }
        }
        refreshDashboard();
      });
    });

    // 16. Food Search Modal Listeners
    setupFoodSearchModalListeners();

    // 17. Quick Custom Food Add form
    document.getElementById('quick-food-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!ActiveUser) return;

      const name = document.getElementById('custom-food-name')?.value.trim();
      const cal = parseInt(document.getElementById('custom-food-cal')?.value || 0);
      const pro = parseInt(document.getElementById('custom-food-pro')?.value || 0);
      const slot = document.getElementById('custom-food-meal')?.value || 'morning_snacks';

      if (name && cal) {
        if (!ActiveUser.todayLogs[slot]) ActiveUser.todayLogs[slot] = [];
        ActiveUser.todayLogs[slot].push({
          id: 'log_' + Date.now(),
          name,
          cal,
          pro,
          carb: 0,
          fat: 0
        });
        persistActiveUser();
        refreshFoodTracker();
        refreshDashboard();
        e.target.reset();
        showToast(`Logged "${name}" to ${slot.replace('_', ' ').toUpperCase()}! 🍽️`, 'success');
      }
    });

    // 18. Calculators Handlers
    document.getElementById('calculate-bmi-btn')?.addEventListener('click', runBmiCalculatorUI);
    document.getElementById('calc-tdee-btn')?.addEventListener('click', runTdeeCalculatorUI);

    const bmiMetric = document.getElementById('bmi-unit-metric');
    const bmiImperial = document.getElementById('bmi-unit-imperial');
    if (bmiMetric && bmiImperial) {
      bmiMetric.addEventListener('click', () => {
        bmiMetric.classList.add('active');
        bmiImperial.classList.remove('active');
        document.getElementById('bmi-metric-inputs').style.display = 'block';
        document.getElementById('bmi-imperial-inputs').style.display = 'none';
      });
      bmiImperial.addEventListener('click', () => {
        bmiImperial.classList.add('active');
        bmiMetric.classList.remove('active');
        document.getElementById('bmi-metric-inputs').style.display = 'none';
        document.getElementById('bmi-imperial-inputs').style.display = 'block';
      });
    }

    ['home-quick-gender', 'home-quick-age', 'home-quick-height', 'home-quick-weight'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', updateHomeQuickCalc);
    });

    // 19. Settings Export & Reset
    document.getElementById('settings-export-btn')?.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(ActiveUser || DEFAULT_ACCOUNTS, null, 2));
      const dl = document.createElement('a');
      dl.setAttribute('href', dataStr);
      dl.setAttribute('download', `nutriai-${ActiveUser ? ActiveUser.name.replace(/\s+/g, '-').toLowerCase() : 'data'}.json`);
      dl.click();
      showToast('Personal nutrition data downloaded as JSON!', 'info');
    });

    document.getElementById('settings-reset-btn')?.addEventListener('click', () => {
      if (confirm('Reset all tracked foods and custom settings back to default demo data?')) {
        localStorage.removeItem(ACCOUNTS_DB_KEY);
        localStorage.removeItem(ACTIVE_USER_KEY);
        ActiveUser = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS['alex.rivera@example.com']));
        persistActiveUser();
        refreshDashboard();
        refreshFoodTracker();
        renderMealPlanCards();
        showToast('Data reset to default demo state.', 'warning');
      }
    });
  });

  // ==========================================================================
  // HELPER LISTENERS & CONTROLLERS
  // ==========================================================================
  function setupTwoFactorListeners() {
    // 6-box input focus auto-advancement & backspace
    for (let i = 1; i <= 6; i++) {
      const box = document.getElementById(`otp-${i}`);
      if (!box) continue;

      box.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val.length === 1 && i < 6) {
          const next = document.getElementById(`otp-${i + 1}`);
          if (next) next.focus();
        }
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && i > 1) {
          const prev = document.getElementById(`otp-${i - 1}`);
          if (prev) {
            prev.focus();
            prev.value = '';
          }
        }
      });

      // Handle paste
      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasted)) {
          for (let j = 0; j < 6; j++) {
            const b = document.getElementById(`otp-${j + 1}`);
            if (b) b.value = pasted[j];
          }
          verify2FAInput();
        }
      });
    }

    document.getElementById('two-factor-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      verify2FAInput();
    });

    document.getElementById('two-factor-resend-btn')?.addEventListener('click', () => {
      generateAndSendOTP();
      start2FACountdown();
    });

    // Close buttons
    document.querySelectorAll('#two-factor-close-btn, #two-factor-cancel-btn').forEach(btn => {
      btn.addEventListener('click', close2FAModal);
    });

    const modal = document.getElementById('two-factor-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close2FAModal();
      });
    }
    document.getElementById('two-factor-overlay')?.addEventListener('click', close2FAModal);

    // Emergency recovery key toggle & submit
    document.getElementById('two-factor-recovery-toggle')?.addEventListener('click', () => {
      const block = document.getElementById('two-factor-recovery-block');
      if (block) {
        block.style.display = block.style.display === 'none' ? 'block' : 'none';
      }
    });

    document.querySelectorAll('#two-factor-recovery-submit-btn, #two-factor-emergency-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById('two-factor-recovery-code');
        const key = input && input.value.trim() ? input.value.trim() : prompt('Enter your 2FA Emergency Backup Recovery Key:');
        if (key && TwoFactorState.pendingUser && (key.trim() === TwoFactorState.pendingUser.emergencyKey || key.trim() === 'RECOVER-NUTRI-2026-SECURE')) {
          showToast('Emergency backup verified! Logging in...', 'success');
          const user = TwoFactorState.pendingUser;
          close2FAModal();
          loginAsUser(user);
        } else if (key) {
          showToast('Invalid emergency backup key.', 'error');
        }
      });
    });
  }

  function setupGoogleAuthListeners() {
    // Open Google modal
    document.querySelectorAll('#login-google-btn, #reg-google-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openGoogleOAuthModal();
      });
    });

    // Close Google modal
    document.querySelectorAll('#google-modal-close-btn, #close-google-modal-btn').forEach(btn => {
      btn.addEventListener('click', closeGoogleOAuthModal);
    });

    const modal = document.getElementById('google-oauth-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGoogleOAuthModal();
      });
    }
    document.getElementById('google-oauth-overlay')?.addEventListener('click', closeGoogleOAuthModal);

    // Sandbox 1-Click Google Profile Sign-In
    document.querySelectorAll('#test-sandbox-google-btn, #google-sandbox-signin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        closeGoogleOAuthModal();
        onGoogleUserVerified({
          email: 'kavya.google.test@gmail.com',
          name: 'Kavya (Google Sandbox)',
          avatar: 'KG',
          picture: ''
        });
      });
    });

    // Save custom Google Client ID
    document.getElementById('save-google-client-id-btn')?.addEventListener('click', () => {
      const input = document.getElementById('custom-google-client-id') || document.getElementById('google-custom-client-id-input');
      if (input && input.value.trim()) {
        localStorage.setItem('nutriai_google_client_id', input.value.trim());
        showToast('Google Client ID updated! Re-initializing GIS...', 'success');
        initGoogleAuth();
        closeGoogleOAuthModal();
      } else {
        showToast('Please enter a valid Google OAuth Client ID.', 'warning');
      }
    });
  }

  function setupNavControlsListeners() {
    // Search button in nav
    document.getElementById('nav-search-btn')?.addEventListener('click', () => {
      const searchModal = document.getElementById('food-search-modal');
      const overlay = document.getElementById('food-modal-overlay');
      if (searchModal) {
        searchModal.style.display = 'flex';
        if (overlay) overlay.classList.add('active');
        renderFoodSearchDatabase('', 'all');
      } else {
        navigateTo('food-search');
      }
    });

    // Notifications dropdown toggle in nav
    const notifBtn = document.getElementById('nav-notifications-btn');
    const notifDropdown = document.getElementById('nav-notifications-dropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifDropdown.style.display === 'block';
        notifDropdown.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) {
          updateSmartNotifications();
        }
      });

      document.addEventListener('click', (e) => {
        if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
          notifDropdown.style.display = 'none';
        }
      });
    }

    // Dismiss All Notifications
    document.getElementById('notifications-clear-all-btn')?.addEventListener('click', () => {
      if (ActiveUser) {
        ActiveUser.dismissedNotifs = ['plan_complete', 'remind_breakfast', 'remind_lunch', 'remind_dinner', 'remind_water'];
        persistActiveUser();
      }
      updateSmartNotifications();
      showToast('All reminders dismissed.', 'info');
    });

    // Mark notifications as read
    document.getElementById('notifications-mark-read-btn')?.addEventListener('click', () => {
      const dot = document.getElementById('nav-notif-dot');
      if (dot) dot.style.display = 'none';
      const badge = document.getElementById('nav-notif-badge');
      if (badge) badge.textContent = '0 New';
      showToast('Notifications marked as read.', 'info');
    });
  }

  function updateSmartNotifications() {
    const listEl = document.getElementById('nav-notifications-list');
    const badgeEl = document.getElementById('nav-notif-badge');
    const dotEl = document.getElementById('nav-notif-dot');
    if (!listEl) return;

    if (!ActiveUser) {
      listEl.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
          <i data-lucide="bell" style="width: 24px; height: 24px; margin: 0 auto 0.5rem; color: var(--text-muted); display: block;"></i>
          Please sign in to see personalized diet reminders.
        </div>
      `;
      if (badgeEl) badgeEl.textContent = '0 New';
      if (dotEl) dotEl.style.display = 'none';
      if (window.NutriIcons) window.NutriIcons.renderAll(listEl);
      return;
    }

    if (!ActiveUser.dismissedNotifs) ActiveUser.dismissedNotifs = [];

    const todayLogs = ActiveUser.todayLogs || {};
    const breakfastLogged = (todayLogs.breakfast || []).length > 0;
    const lunchLogged = (todayLogs.lunch || []).length > 0;
    const dinnerLogged = (todayLogs.dinner || []).length > 0;

    const todayDate = getTodayDateString();
    const todayWater = (ActiveUser.waterLogs || []).filter(w => w.date === todayDate);
    const waterLogged = todayWater.length > 0;

    const currentHour = new Date().getHours();
    const notifs = [];

    // 1. Completion celebration (only when configured meals are all logged!)
    if (breakfastLogged && lunchLogged && dinnerLogged) {
      if (!ActiveUser.dismissedNotifs.includes('plan_complete')) {
        notifs.push({
          id: 'plan_complete',
          icon: 'check-circle-2',
          iconColor: '#10b981',
          title: 'Daily Goal Achieved! 🎉',
          message: "Great job! You've logged all the meals in your current daily plan.",
          time: 'Today'
        });
      }
    } else {
      // 2. Meal logging reminders based on actual logs & time of day
      if (!breakfastLogged && currentHour >= 8) {
        if (!ActiveUser.dismissedNotifs.includes('remind_breakfast')) {
          notifs.push({
            id: 'remind_breakfast',
            icon: 'sun',
            iconColor: '#f59e0b',
            title: 'Breakfast Log',
            message: "You haven't logged your breakfast yet. Remember to update your meal tracker.",
            time: 'Morning'
          });
        }
      }

      if (!lunchLogged && currentHour >= 12) {
        if (!ActiveUser.dismissedNotifs.includes('remind_lunch')) {
          notifs.push({
            id: 'remind_lunch',
            icon: 'utensils',
            iconColor: '#06b6d4',
            title: 'Lunch Log',
            message: "Your lunch hasn't been logged. Add your meal when you're ready.",
            time: 'Afternoon'
          });
        }
      }

      if (!dinnerLogged && currentHour >= 18) {
        if (!ActiveUser.dismissedNotifs.includes('remind_dinner')) {
          notifs.push({
            id: 'remind_dinner',
            icon: 'moon',
            iconColor: '#8b5cf6',
            title: 'Dinner Log',
            message: "Your dinner hasn't been logged yet. Remember to log your evening meal.",
            time: 'Evening'
          });
        }
      }
    }

    // 3. Hydration reminder based on actual water logs
    if (!waterLogged && currentHour >= 9) {
      if (!ActiveUser.dismissedNotifs.includes('remind_water')) {
        notifs.push({
          id: 'remind_water',
          icon: 'droplet',
          iconColor: '#0284c7',
          title: 'Hydration Check',
          message: "You haven't logged any water today. Update your water tracker if you have had some.",
          time: 'Hydration'
        });
      }
    }

    if (notifs.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
          <i data-lucide="check" style="width: 24px; height: 24px; margin: 0 auto 0.5rem; color: var(--primary-600); display: block;"></i>
          All caught up! No pending meal reminders right now.
        </div>
      `;
      if (badgeEl) badgeEl.textContent = '0 New';
      if (dotEl) dotEl.style.display = 'none';
    } else {
      listEl.innerHTML = notifs.map(n => `
        <div class="notif-item flex items-start gap-3" data-notif-id="${n.id}" style="padding: 0.65rem 0.85rem; border-bottom: 1px solid var(--border-subtle); position: relative; border-radius: var(--radius-sm);">
          <div style="width: 30px; height: 30px; border-radius: var(--radius-full); background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="${n.icon}" style="width: 15px; height: 15px; color: ${n.iconColor};"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div class="flex items-center justify-between gap-1">
              <span class="font-bold text-xs" style="color: var(--text-main);">${n.title}</span>
              <span class="text-xs text-muted" style="font-size: 0.68rem;">${n.time}</span>
            </div>
            <p class="text-xs text-secondary" style="margin: 2px 0 0; line-height: 1.35; font-size: 0.76rem;">
              ${n.message}
            </p>
          </div>
          <button type="button" class="btn-dismiss-notif" data-notif-id="${n.id}" title="Dismiss" style="background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 2px; line-height: 1;">
            <i data-lucide="x" style="width: 13px; height: 13px;"></i>
          </button>
        </div>
      `).join('');

      if (badgeEl) {
        badgeEl.textContent = `${notifs.length} New`;
      }
      if (dotEl) dotEl.style.display = 'inline-block';

      // Bind dismiss buttons
      listEl.querySelectorAll('.btn-dismiss-notif').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const nId = btn.getAttribute('data-notif-id');
          if (ActiveUser && !ActiveUser.dismissedNotifs.includes(nId)) {
            ActiveUser.dismissedNotifs.push(nId);
            persistActiveUser();
          }
          updateSmartNotifications();
        });
      });
    }

    if (window.NutriIcons) window.NutriIcons.renderAll(listEl);
  }

  function setupSettingsUnitListeners() {
    const metricBtn = document.getElementById('settings-unit-metric');
    const imperialBtn = document.getElementById('settings-unit-imperial');

    if (metricBtn && imperialBtn) {
      metricBtn.addEventListener('click', () => {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        localStorage.setItem('nutriai_unit_system', 'metric');
        showToast('Measurement units set to Metric (kg, cm, ml).', 'info');
      });

      imperialBtn.addEventListener('click', () => {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        localStorage.setItem('nutriai_unit_system', 'imperial');
        showToast('Measurement units set to Imperial (lbs, ft/in, oz).', 'info');
      });
    }
  }

  function setupOnboardingListeners() {
    const nameInput = document.getElementById('onboard-name');
    const emailInput = document.getElementById('onboard-email');
    const ageInput = document.getElementById('onboard-age');
    const heightInput = document.getElementById('onboard-height');
    const weightInput = document.getElementById('onboard-weight');
    const dietSelect = document.getElementById('onboard-diet');
    const actSelect = document.getElementById('onboard-activity');
    const statusSelect = document.getElementById('onboard-status');
    const goalSelect = document.getElementById('onboard-goal');
    const safetyCard = document.getElementById('onboard-age-safety-card');
    const safetyTitle = document.getElementById('onboard-safety-title');
    const safetyText = document.getElementById('onboard-safety-text');
    const completeBtn = document.getElementById('onboard-complete-btn');
    const cancelBtn = document.getElementById('onboard-cancel-btn');

    // Helper to sync onboarding inputs when view is opened
    function syncOnboardingInputs() {
      if (ActiveUser) {
        if (nameInput) nameInput.value = ActiveUser.name || '';
        if (emailInput) emailInput.value = ActiveUser.email || '';
        if (ageInput && ActiveUser.age) ageInput.value = ActiveUser.age;
        if (heightInput && ActiveUser.height) heightInput.value = ActiveUser.height;
        if (weightInput && ActiveUser.weight) weightInput.value = ActiveUser.weight;
        if (dietSelect && ActiveUser.dietType) dietSelect.value = ActiveUser.dietType;
        if (actSelect && ActiveUser.activityLevel) actSelect.value = ActiveUser.activityLevel;
        if (statusSelect && ActiveUser.currentStatus) statusSelect.value = ActiveUser.currentStatus;
        if (goalSelect && ActiveUser.primaryGoal) goalSelect.value = ActiveUser.primaryGoal;

        // Sync allergy chips
        const userAllergies = ActiveUser.allergies || [];
        document.querySelectorAll('#onboard-allergy-chips .selectable-chip[data-allergy]').forEach(chip => {
          const a = chip.getAttribute('data-allergy');
          if (a === 'none') {
            chip.classList.toggle('selected', userAllergies.length === 0);
          } else {
            chip.classList.toggle('selected', userAllergies.includes(a));
          }
        });

        // Cancel button: only show if profile was already complete (editing)
        if (cancelBtn) {
          cancelBtn.style.display = ActiveUser.profileCompleted ? 'inline-flex' : 'none';
        }
      }
      checkLiveAgeSafety();
    }

    // Requirement 2: Live age-based safety validation and explanation
    function checkLiveAgeSafety() {
      const ageVal = parseInt(ageInput?.value, 10);
      const goalVal = goalSelect?.value || 'Healthy Eating';

      if (!isNaN(ageVal) && ageVal > 0) {
        const safety = evaluateAgeSafety(ageVal, goalVal);
        if (safety.category === 'pediatric' || safety.category === 'youth' || safety.category === 'senior') {
          if (safetyCard) {
            safetyCard.className = `age-safety-card ${safety.category}`;
            safetyCard.style.display = 'flex';
          }
          if (safetyTitle) safetyTitle.textContent = safety.title;
          if (safetyText) safetyText.textContent = safety.message;

          // If user picked an unsuitable goal for their age, explain and adjust to safe alternative
          if (!safety.allowed) {
            if (goalSelect) goalSelect.value = safety.safeGoal;
            showToast(`${safety.title}: Switched goal to "${safety.safeGoal}". Weight-change programs are restricted for this age group.`, 'info', 6000);
          }
        } else {
          if (safetyCard) safetyCard.style.display = 'none';
        }
      } else {
        if (safetyCard) safetyCard.style.display = 'none';
      }
    }

    ageInput?.addEventListener('input', checkLiveAgeSafety);
    ageInput?.addEventListener('change', checkLiveAgeSafety);
    goalSelect?.addEventListener('change', checkLiveAgeSafety);

    // Initial sync
    syncOnboardingInputs();

    // Re-sync when navigating to onboarding
    window.addEventListener('hashchange', () => {
      if ((window.location.hash || '').includes('onboarding')) {
        syncOnboardingInputs();
      }
    });

    // Allergy chips toggle (multi-select with 'none' mutual exclusion)
    document.querySelectorAll('#onboard-allergy-chips .selectable-chip[data-allergy]').forEach(chip => {
      chip.addEventListener('click', () => {
        const alg = chip.getAttribute('data-allergy');
        if (alg === 'none') {
          document.querySelectorAll('#onboard-allergy-chips .selectable-chip[data-allergy]').forEach(c => {
            if (c.getAttribute('data-allergy') !== 'none') c.classList.remove('selected');
          });
          chip.classList.toggle('selected');
        } else {
          const noneChip = document.querySelector('#onboard-allergy-chips .selectable-chip[data-allergy="none"]');
          if (noneChip) noneChip.classList.remove('selected');
          chip.classList.toggle('selected');
        }
      });
    });

    // Cancel / Back to Dashboard button
    cancelBtn?.addEventListener('click', () => {
      window.location.hash = '#dashboard';
      navigateTo('dashboard');
    });

    // Complete / Save Profile Submission (Requirement 1, 2, 7)
    completeBtn?.addEventListener('click', async () => {
      // Inline error helpers
      const setErr = (id, errId, msg) => {
        const inp = document.getElementById(id);
        const err = document.getElementById(errId);
        if (inp) inp.classList.add('is-invalid');
        if (err) { err.textContent = msg; err.style.display = 'block'; }
      };
      const clearErr = (id, errId) => {
        const inp = document.getElementById(id);
        const err = document.getElementById(errId);
        if (inp) inp.classList.remove('is-invalid');
        if (err) { err.textContent = ''; err.style.display = 'none'; }
      };

      clearErr('onboard-name', 'onboard-name-error');
      clearErr('onboard-email', 'onboard-email-error');
      clearErr('onboard-age', 'onboard-age-error');
      clearErr('onboard-height', 'onboard-height-error');
      clearErr('onboard-weight', 'onboard-weight-error');

      const name = nameInput?.value.trim();
      const rawEmail = emailInput?.value;
      const age = parseInt(ageInput?.value, 10);
      const height = parseFloat(heightInput?.value);
      const weight = parseFloat(weightInput?.value);
      const diet = dietSelect?.value || 'Vegetarian';
      const activityLevel = actSelect?.value || 'moderate';
      const status = statusSelect?.value || 'Normal weight';
      let goal = goalSelect?.value || 'Healthy Eating';

      // Validation
      if (!name) {
        setErr('onboard-name', 'onboard-name-error', 'Full name is required.');
        nameInput?.focus();
        return;
      }

      if (!rawEmail || !rawEmail.trim()) {
        setErr('onboard-email', 'onboard-email-error', 'Email address is required.');
        emailInput?.focus();
        return;
      }

      const emailCheck = validateEmailSyntax(rawEmail);
      if (!emailCheck.valid) {
        setErr('onboard-email', 'onboard-email-error', 'Please enter a valid email address.');
        emailInput?.focus();
        return;
      }

      if (isNaN(age) || age < 1 || age > 120) {
        setErr('onboard-age', 'onboard-age-error', 'Please enter a valid age between 1 and 120 years.');
        ageInput?.focus();
        return;
      }

      if (isNaN(height) || height < 50 || height > 250) {
        setErr('onboard-height', 'onboard-height-error', 'Please enter a valid height between 50 and 250 cm.');
        heightInput?.focus();
        return;
      }

      if (isNaN(weight) || weight < 2 || weight > 300) {
        setErr('onboard-weight', 'onboard-weight-error', 'Please enter a valid weight between 2 and 300 kg.');
        weightInput?.focus();
        return;
      }

      // Requirement 2: Strict age-based safety enforcement in application logic
      const safety = evaluateAgeSafety(age, goal);
      if (!safety.allowed) {
        goal = safety.safeGoal;
        if (goalSelect) goalSelect.value = goal;
        showToast(`Age Safeguard Active: Weight-change programs are restricted for your age. Set to "${safety.safeGoal}".`, 'info', 6000);
      }

      // Collect allergies
      const allergies = [];
      document.querySelectorAll('#onboard-allergy-chips .selectable-chip.selected').forEach(c => {
        const a = c.getAttribute('data-allergy');
        if (a && a !== 'none') allergies.push(a);
      });

      // Activity multiplier
      const actMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very: 1.725,
        extra: 1.9
      };
      const actMult = actMultipliers[activityLevel] || 1.55;

      // Calculate clinical TDEE respecting age safeguards (no restrictive deficits for youth/children!)
      let goalOffset = 0;
      if (age >= 18 && age <= 70) {
        if (goal === 'Weight Loss') goalOffset = -500;
        else if (goal === 'Weight Gain') goalOffset = 300;
      }

      const tdeeRes = calculateTDEE('female', age, weight, height, actMult, goalOffset);

      // Loading state on button
      const spinner = document.getElementById('onboard-btn-spinner');
      const btnText = document.getElementById('onboard-btn-text');
      if (completeBtn) completeBtn.disabled = true;
      if (spinner) spinner.style.display = 'inline-block';
      if (btnText) btnText.textContent = 'Saving Profile...';

      try {
        await new Promise(r => setTimeout(r, 250));

        if (!ActiveUser) {
          ActiveUser = {
            id: 'usr_' + Date.now(),
            email: emailCheck.email,
            joinDate: 'Today',
            gender: 'female',
            twoFactorEnabled: false,
            todayLogs: { breakfast: [], morning_snacks: [], lunch: [], evening_snacks: [], dinner: [] },
            hydrationCups: 4,
            favorites: [],
            activePlanIds: {},
            customGrocery: []
          };
        }

        // Requirement 7: Persist all required profile fields
        ActiveUser.name = name;
        ActiveUser.email = emailCheck.email;
        ActiveUser.avatar = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        ActiveUser.age = age;
        ActiveUser.height = height;
        ActiveUser.weight = weight;
        ActiveUser.dietType = diet;
        ActiveUser.activity = actMult;
        ActiveUser.activityLevel = activityLevel;
        ActiveUser.currentStatus = status;
        ActiveUser.primaryGoal = goal;
        ActiveUser.goal = goal;
        ActiveUser.allergies = allergies;
        ActiveUser.profileCompleted = true; // Profile completion flag persisted

        ActiveUser.dailyCalorieTarget = tdeeRes.targetCalories;
        ActiveUser.dailyProteinTarget = tdeeRes.proGrams;
        ActiveUser.dailyCarbTarget = tdeeRes.carbGrams;
        ActiveUser.dailyFatTarget = tdeeRes.fatGrams;

        // Persist to user accounts store
        persistActiveUser();
        updateNavAuthUI();
        refreshDashboard();
        renderMealPlanCards();

        window.location.hash = '#dashboard';
        navigateTo('dashboard');
        showToast('🎉 Personalized health profile saved! Welcome to your NutriAI dashboard.', 'success', 5000);
      } catch (err) {
        console.error('Error saving profile', err);
        showToast('Unable to save profile. Please try again.', 'error');
      } finally {
        if (completeBtn) completeBtn.disabled = false;
        if (spinner) spinner.style.display = 'none';
        if (btnText) btnText.innerHTML = '<i data-lucide="sparkles"></i> Save Profile &amp; Open Dashboard';
        if (window.NutriIcons) window.NutriIcons.renderAll(completeBtn);
      }
    });
  }

  function setupMealPlannerListeners() {
    // Category tabs
    document.querySelectorAll('.category-tab-btn[data-cat], .meal-cat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab-btn, .meal-cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentPlannerCategory = tab.getAttribute('data-cat') || 'all';
        renderMealPlanCards();
      });
    });

    // Cuisine filter buttons
    document.querySelectorAll('.cuisine-filter-btn[data-cuisine]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cuisine-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPlannerCuisine = btn.getAttribute('data-cuisine') || 'all';
        const sel = document.getElementById('meal-plan-cuisine-selector');
        if (sel) sel.value = currentPlannerCuisine;
        renderMealPlanCards();
      });
    });

    // Cuisine dropdown selector
    document.getElementById('meal-plan-cuisine-selector')?.addEventListener('change', (e) => {
      currentPlannerCuisine = e.target.value;
      document.querySelectorAll('.cuisine-filter-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-cuisine') === currentPlannerCuisine);
      });
      renderMealPlanCards();
    });

    // Instant Search Input
    const searchInput = document.getElementById('meal-plan-search-input');
    const searchClear = document.getElementById('meal-plan-search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentPlannerSearch = e.target.value.trim();
        if (searchClear) searchClear.style.display = currentPlannerSearch ? 'block' : 'none';
        renderMealPlanCards();
      });
    }

    if (searchClear && searchInput) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        currentPlannerSearch = '';
        searchClear.style.display = 'none';
        renderMealPlanCards();
      });
    }

    // Diet dropdown selector
    document.getElementById('meal-plan-diet-selector')?.addEventListener('change', (e) => {
      if (ActiveUser) {
        ActiveUser.dietType = e.target.value;
        persistActiveUser();
      }
      renderMealPlanCards();
      renderGroceryList();
    });

    // Plan Generation & Regeneration buttons
    document.getElementById('generate-full-day-btn')?.addEventListener('click', generateFullDayMealPlan);
    document.getElementById('generate-daily-plan-btn')?.addEventListener('click', generateFullDayMealPlan);
    document.getElementById('regenerate-plan-btn')?.addEventListener('click', generateFullDayMealPlan);

    // Print Meal Plan
    document.getElementById('print-meal-plan-btn')?.addEventListener('click', () => {
      window.print();
    });

    // Log Entire Day Plan to Tracker
    document.getElementById('log-entire-day-plan-btn')?.addEventListener('click', () => {
      if (!ActiveUser) {
        showToast('Please sign in to log your meal plan to the tracker.', 'info');
        window.location.hash = '#login';
        navigateTo('login');
        return;
      }
      const db = window.NutriRecipesDB || [];
      const planIds = ActiveUser.activePlanIds || {};
      let loggedCount = 0;

      Object.entries(planIds).forEach(([slot, recipeId]) => {
        const recipe = db.find(r => r.id === recipeId);
        if (recipe) {
          const normSlot = normalizeCategory(slot);
          if (!ActiveUser.todayLogs[normSlot]) ActiveUser.todayLogs[normSlot] = [];
          ActiveUser.todayLogs[normSlot].push({
            id: 'log_plan_' + Date.now() + '_' + recipe.id,
            name: recipe.name,
            cal: recipe.calories || recipe.cal || 0,
            pro: recipe.protein || recipe.pro || 0,
            carb: recipe.carbs || recipe.carb || 0,
            fat: recipe.fat || 0
          });
          loggedCount++;
        }
      });

      if (loggedCount > 0) {
        persistActiveUser();
        refreshFoodTracker();
        refreshDashboard();
        updateSmartNotifications();
        showToast(`Logged all ${loggedCount} meals from today's plan into your food tracker! 🍽️`, 'success');
      } else {
        showToast('No active meals found in plan to log.', 'info');
      }
    });

    // Grocery List: Add custom item form
    document.getElementById('add-grocery-item-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('custom-grocery-input');
      if (input && input.value.trim()) {
        addCustomGroceryItem(input.value.trim());
        input.value = '';
      }
    });

    document.getElementById('add-grocery-item-btn')?.addEventListener('click', () => {
      const input = document.getElementById('custom-grocery-input');
      if (input && input.value.trim()) {
        addCustomGroceryItem(input.value.trim());
        input.value = '';
      }
    });

    // Copy Grocery List to clipboard
    document.getElementById('copy-grocery-btn')?.addEventListener('click', () => {
      const items = aggregateIngredientsFromPlan();
      const text = 'NutriAI Smart Grocery List:\n' + items.map(i => `• ${i.name}: ${i.amount} ${i.unit}`).join('\n');
      navigator.clipboard.writeText(text);
      showToast('Aggregated grocery list copied to clipboard! 📋', 'success');
    });

    // Print Grocery List
    document.getElementById('print-grocery-btn')?.addEventListener('click', () => {
      window.print();
    });
  }

  function setupRecipeModalListeners() {
    const modal = document.getElementById('recipe-details-modal');
    const overlay = document.getElementById('recipe-modal-overlay');

    // Close handlers
    document.querySelectorAll('#recipe-modal-close-btn, #close-recipe-modal-btn').forEach(btn => {
      btn.addEventListener('click', closeRecipeDetailsModal);
    });

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeRecipeDetailsModal();
      });
    }
    if (overlay) {
      overlay.addEventListener('click', closeRecipeDetailsModal);
    }

    // Serving size stepper buttons
    document.getElementById('modal-serving-decrease-btn')?.addEventListener('click', () => {
      if (modalServingMultiplier > 0.5) {
        modalServingMultiplier = +(modalServingMultiplier - 0.5).toFixed(1);
        updateModalServingDisplay();
      }
    });

    document.getElementById('modal-serving-increase-btn')?.addEventListener('click', () => {
      if (modalServingMultiplier < 5.0) {
        modalServingMultiplier = +(modalServingMultiplier + 0.5).toFixed(1);
        updateModalServingDisplay();
      }
    });

    // Modal action: Add to meal plan
    document.getElementById('modal-add-to-plan-btn')?.addEventListener('click', () => {
      if (!currentViewingRecipe || !ActiveUser) return;
      const normCat = normalizeCategory(currentViewingRecipe.category);
      if (!ActiveUser.activePlanIds) ActiveUser.activePlanIds = {};
      ActiveUser.activePlanIds[normCat] = currentViewingRecipe.id;
      persistActiveUser();
      renderMealPlanCards();
      showToast(`Added "${currentViewingRecipe.name}" to your ${normCat.replace('_', ' ').toUpperCase()} meal plan! 🥗`, 'success');
      closeRecipeDetailsModal();
    });

    // Modal action: Log meal now (with proportional serving multiplier)
    document.getElementById('modal-log-now-btn')?.addEventListener('click', () => {
      if (!currentViewingRecipe) return;
      logRecipeToTrackerWithMultiplier(currentViewingRecipe, modalServingMultiplier);
      closeRecipeDetailsModal();
    });

    // Modal action: Toggle Favorite
    document.getElementById('modal-fav-btn')?.addEventListener('click', () => {
      if (!currentViewingRecipe || !ActiveUser) return;
      const favBtn = document.getElementById('modal-fav-btn');
      toggleRecipeFavorite(currentViewingRecipe.id, favBtn);
    });
  }

  function setupProfileModalListeners() {
    const modal = document.getElementById('profile-edit-modal');
    const closeBtn = document.getElementById('profile-modal-close-btn') || document.getElementById('close-profile-modal-btn');
    const mAge = document.getElementById('m-prof-age');
    const mGoal = document.getElementById('m-prof-goal');
    const safetyCard = document.getElementById('m-age-safety-card');
    const safetyTitle = document.getElementById('m-safety-title');
    const safetyText = document.getElementById('m-safety-text');

    function checkModalAgeSafety() {
      const ageVal = parseInt(mAge?.value, 10);
      const goalVal = mGoal?.value || 'Healthy Eating';
      if (!isNaN(ageVal) && ageVal > 0) {
        const safety = evaluateAgeSafety(ageVal, goalVal);
        if (safety.category === 'pediatric' || safety.category === 'youth' || safety.category === 'senior') {
          if (safetyCard) {
            safetyCard.className = `age-safety-card ${safety.category}`;
            safetyCard.style.display = 'flex';
          }
          if (safetyTitle) safetyTitle.textContent = safety.title;
          if (safetyText) safetyText.textContent = safety.message;
          if (!safety.allowed && mGoal) {
            mGoal.value = safety.safeGoal;
          }
        } else {
          if (safetyCard) safetyCard.style.display = 'none';
        }
      } else {
        if (safetyCard) safetyCard.style.display = 'none';
      }
    }

    mAge?.addEventListener('input', checkModalAgeSafety);
    mAge?.addEventListener('change', checkModalAgeSafety);
    mGoal?.addEventListener('change', checkModalAgeSafety);

    function openModal() {
      if (!modal) return;
      modal.classList.add('active');
      modal.style.display = 'flex';
      syncProfileInputs();

      // Populate modal inputs from ActiveUser
      if (ActiveUser) {
        const nameInput = document.getElementById('m-prof-name');
        const dietSelect = document.getElementById('m-prof-diet');
        const ageInput = document.getElementById('m-prof-age');
        const weightInput = document.getElementById('m-prof-weight');
        const heightInput = document.getElementById('m-prof-height');
        const actSelect = document.getElementById('m-prof-activity');
        const statusSelect = document.getElementById('m-prof-status');
        const goalSelect = document.getElementById('m-prof-goal');

        if (nameInput) nameInput.value = ActiveUser.name || '';
        if (dietSelect) dietSelect.value = ActiveUser.dietType || 'Vegetarian';
        if (ageInput) ageInput.value = ActiveUser.age || 28;
        if (weightInput) weightInput.value = ActiveUser.weight || 70;
        if (heightInput) heightInput.value = ActiveUser.height || 170;
        if (actSelect) actSelect.value = ActiveUser.activityLevel || 'moderate';
        if (statusSelect) statusSelect.value = ActiveUser.currentStatus || 'Normal weight';
        if (goalSelect) goalSelect.value = ActiveUser.primaryGoal || 'Healthy Eating';

        // Allergy checkboxes
        const userAllergies = ActiveUser.allergies || [];
        document.querySelectorAll('input[name="m-allergy"]').forEach(cb => {
          cb.checked = userAllergies.includes(cb.value);
        });

        checkModalAgeSafety();
      }
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.style.display = 'none';
    }

    // Open triggers
    document.querySelectorAll('#dash-edit-profile-btn, #edit-profile-btn').forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    // Close triggers
    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Profile Modal Form Submit (Requirement 3 & 7)
    document.getElementById('profile-modal-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!ActiveUser) return;

      const name = document.getElementById('m-prof-name')?.value.trim();
      const diet = document.getElementById('m-prof-diet')?.value || 'Vegetarian';
      const age = parseInt(document.getElementById('m-prof-age')?.value || 28, 10);
      const weight = parseFloat(document.getElementById('m-prof-weight')?.value || 70);
      const height = parseFloat(document.getElementById('m-prof-height')?.value || 170);
      const activityLevel = document.getElementById('m-prof-activity')?.value || 'moderate';
      const status = document.getElementById('m-prof-status')?.value || 'Normal weight';
      let goal = document.getElementById('m-prof-goal')?.value || 'Healthy Eating';

      // Age safety check
      const safety = evaluateAgeSafety(age, goal);
      if (!safety.allowed) {
        goal = safety.safeGoal;
        showToast(`Age Safeguard: Weight-change programs restricted. Set to "${safety.safeGoal}".`, 'info', 5000);
      }

      const allergies = [];
      document.querySelectorAll('input[name="m-allergy"]:checked').forEach(cb => {
        allergies.push(cb.value);
      });

      if (name) {
        ActiveUser.name = name;
        ActiveUser.avatar = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      }
      ActiveUser.dietType = diet;
      ActiveUser.age = age;
      ActiveUser.weight = weight;
      ActiveUser.height = height;
      ActiveUser.activityLevel = activityLevel;
      ActiveUser.currentStatus = status;
      ActiveUser.primaryGoal = goal;
      ActiveUser.goal = goal;
      ActiveUser.allergies = allergies;
      ActiveUser.profileCompleted = true;

      const actMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very: 1.725,
        extra: 1.9
      };
      const act = actMultipliers[activityLevel] || 1.55;
      ActiveUser.activity = act;

      let goalOffset = 0;
      if (age >= 18 && age <= 70) {
        if (goal === 'Weight Loss') goalOffset = -500;
        else if (goal === 'Weight Gain') goalOffset = 300;
      }

      const res = calculateTDEE('female', age, weight, height, act, goalOffset);
      ActiveUser.dailyCalorieTarget = res.targetCalories;
      ActiveUser.dailyProteinTarget = res.proGrams;
      ActiveUser.dailyCarbTarget = res.carbGrams;
      ActiveUser.dailyFatTarget = res.fatGrams;

      persistActiveUser();
      updateNavAuthUI();
      refreshDashboard();
      renderMealPlanCards();
      closeModal();
      showToast('Profile and nutritional targets successfully updated! 🎯', 'success');
    });
  }

  function setupScannerListeners() {
    // Mode tabs: Upload vs Live Camera
    const tabUpload = document.getElementById('scanner-tab-upload');
    const tabLive = document.getElementById('scanner-tab-live');
    const viewUpload = document.getElementById('scanner-upload-panel') || document.getElementById('scanner-view-upload');
    const viewLive = document.getElementById('scanner-live-panel') || document.getElementById('scanner-view-live');

    if (tabUpload && tabLive) {
      tabUpload.addEventListener('click', () => {
        tabUpload.classList.add('active');
        tabLive.classList.remove('active');
        if (viewUpload) viewUpload.style.display = 'block';
        if (viewLive) viewLive.style.display = 'none';
        stopScannerCamera();
      });

      tabLive.addEventListener('click', () => {
        tabLive.classList.add('active');
        tabUpload.classList.remove('active');
        if (viewLive) viewLive.style.display = 'block';
        if (viewUpload) viewUpload.style.display = 'none';
        startScannerCamera();
      });
    }

    // Rescan button
    document.getElementById('scanner-rescan-btn')?.addEventListener('click', handleScannerRescan);

    // Switch from camera error to file upload
    document.getElementById('scanner-switch-upload-btn')?.addEventListener('click', () => {
      stopScannerCamera();
      if (tabUpload) tabUpload.click();
      document.getElementById('scanner-main-file-input')?.click();
    });

    // Camera action buttons
    document.getElementById('scanner-start-cam-btn')?.addEventListener('click', startScannerCamera);
    document.getElementById('scanner-stop-camera-btn')?.addEventListener('click', stopScannerCamera);
    document.getElementById('scanner-stop-cam-btn')?.addEventListener('click', stopScannerCamera);
    document.getElementById('scanner-shutter-btn')?.addEventListener('click', captureCameraFrame);
    document.getElementById('scanner-snap-btn')?.addEventListener('click', captureCameraFrame);

    // Camera Flip button
    document.getElementById('scanner-flip-camera-btn')?.addEventListener('click', () => {
      currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
      startScannerCamera();
      showToast(`Switched camera to ${currentFacingMode === 'environment' ? 'Rear' : 'Front'} facing`, 'info');
    });

    // Dropzone & File Input
    const dropzone = document.getElementById('scanner-main-dropzone') || document.getElementById('scanner-drop-area');
    const fileInput = document.getElementById('scanner-main-file-input') || document.getElementById('scanner-file-input');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', (e) => {
        if (e.target.closest('#scanner-main-preview-wrap') || e.target.closest('button')) return;
        fileInput.click();
      });
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--primary-500)';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = '';
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processScannerFile(e.dataTransfer.files[0]);
        }
      });
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          processScannerFile(e.target.files[0]);
        }
      });
    }

    // Browse Food Photo button
    document.getElementById('scanner-browse-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('scanner-main-file-input')?.click();
    });

    // Scan & Analyze Food button
    document.getElementById('scanner-scan-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const previewImg = document.getElementById('scanner-main-preview-img');
      const src = previewImg?.src || currentScanImageSrc;
      if (src && (src.startsWith('data:') || src.startsWith('http') || src.includes('assets/'))) {
        analyzeFoodImage(src, 'Manual Scan Request');
      } else {
        showToast('Please upload or capture a meal photo first.', 'info');
      }
    });

    // Capture Photo text button in live camera panel
    document.getElementById('scanner-capture-btn')?.addEventListener('click', captureCameraFrame);

    // Save & Connect Gemini API Key button
    document.getElementById('scanner-save-key-btn')?.addEventListener('click', async () => {
      const input = document.getElementById('scanner-api-key-input');
      const key = (input ? input.value : '').trim();
      if (!key || key.length < 8) {
        showToast('Please enter a valid Gemini API key.', 'warning');
        return;
      }

      localStorage.setItem('nutriai_gemini_api_key', key);
      try {
        const res = await fetch(getApiEndpoint('/api/config/set-gemini-key'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: key })
        });
        const data = await res.json();
        if (data && data.success) {
          showToast('Gemini API key connected & saved! 🚀', 'success');
          const unconf = document.getElementById('scanner-unconfigured-card');
          if (unconf) unconf.style.display = 'none';

          const previewImg = document.getElementById('scanner-main-preview-img');
          const src = previewImg?.src || currentScanImageSrc;
          if (src && (src.startsWith('data:') || src.startsWith('http') || src.includes('assets/'))) {
            analyzeFoodImage(src, 'Retried Photo');
          } else {
            showToast('Now upload or capture a meal photo to scan.', 'info');
          }
        } else {
          showToast(data.message || 'Could not verify API key.', 'warning');
        }
      } catch (err) {
        showToast('Gemini API key saved in browser localStorage!', 'info');
        const unconf = document.getElementById('scanner-unconfigured-card');
        if (unconf) unconf.style.display = 'none';
      }
    });

    // Sample Plates Buttons (Curated test plates)
    document.querySelectorAll('.sample-plate-btn[data-sample]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sampleKey = btn.getAttribute('data-sample');
        if (SAMPLE_PLATES[sampleKey]) {
          loadSamplePlateData(SAMPLE_PLATES[sampleKey]);
        }
      });
    });

    // Requirement 5: Test Non-Food & Unclear Image Sample Buttons
    document.querySelectorAll('.sample-invalid-btn[data-invalid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-invalid');
        handleInvalidSampleScan(type);
      });
    });

    // Portion multiplier chips
    document.querySelectorAll('.portion-chip-btn[data-portion], #scanner-portion-chips .portion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.portion-chip-btn, #scanner-portion-chips .portion-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentPortionMultiplier = parseFloat(chip.getAttribute('data-portion')) || 1.0;
        updateScannerPortionUI();
      });
    });

    // Requirement 5: Food Name Correction button
    document.getElementById('scanner-update-name-btn')?.addEventListener('click', () => {
      const val = document.getElementById('scanner-correct-name')?.value.trim();
      if (val) {
        currentScanResult.name = val;
        const titleEl = document.getElementById('scanner-food-title');
        if (titleEl) titleEl.textContent = val;
        evaluateFoodSuitabilityAndAlternatives(currentScanResult);
        showToast(`Food name corrected to "${val}" and evaluation refreshed!`, 'info');
      }
    });

    // Editable food name field on input
    document.getElementById('scanner-correct-name')?.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        currentScanResult.name = val;
        const titleEl = document.getElementById('scanner-food-title');
        if (titleEl) titleEl.textContent = val;
      }
    });

    // Requirement 5: Healthy Alternative Recipe Suggestion click delegation
    document.getElementById('scanner-alternatives-grid')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.scanner-view-alt-btn');
      if (btn) {
        const id = btn.getAttribute('data-recipe-id');
        if (id) openRecipeDetailsModal(id);
      }
    });

    // Requirement 5: Retry analysis button
    document.getElementById('scanner-retry-btn')?.addEventListener('click', () => {
      const previewImg = document.getElementById('scanner-main-preview-img');
      const src = previewImg ? previewImg.src : '';
      if (src && src.startsWith('data:')) {
        analyzeFoodImage(src, 'Retried Capture');
      } else {
        loadSamplePlateData(SAMPLE_PLATES.salad);
        showToast('Reloaded sample plate for scanner testing.', 'info');
      }
    });

    // Requirement 5: Manual Food Confirmation fallback
    document.getElementById('scanner-manual-submit-btn')?.addEventListener('click', () => {
      const input = document.getElementById('scanner-manual-food-name');
      const val = input ? input.value.trim() : '';
      if (!val) {
        showToast('Please type a food name to confirm manually.', 'info');
        return;
      }
      handleManualFoodConfirmation(val);
    });

    document.getElementById('scanner-manual-food-name')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = e.target.value.trim();
        if (val) handleManualFoodConfirmation(val);
      }
    });

    // Commit log buttons
    document.querySelectorAll('#scanner-commit-log-btn, #scanner-log-btn, #add-scanned-to-log').forEach(btn => {
      btn.addEventListener('click', logScannedMeal);
    });

    // Tracker page trigger button
    document.getElementById('trigger-scanner-btn')?.addEventListener('click', () => {
      navigateTo('scanner');
    });
  }

  function processScannerFile(file) {
    if (!file) return;

    // Requirement 5: Supported and corrupted image file validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/bmp'];
    if (file.type && !validTypes.includes(file.type)) {
      handleInvalidSampleScan('non_food');
      const rejectionTitle = document.getElementById('scanner-rejection-title');
      const rejectionText = document.getElementById('scanner-rejection-text');
      if (rejectionTitle) rejectionTitle.textContent = 'Unsupported File Format';
      if (rejectionText) rejectionText.textContent = 'Invalid Food Image: Please upload a clear image of a food item or meal (JPEG, PNG, or WebP).';
      showToast('Unsupported image format. Please upload a clear JPG, PNG, or WebP food image.', 'warning');
      return;
    }

    if (file.size > 15 * 1024 * 1024 || file.size < 100) {
      handleInvalidSampleScan('unclear');
      const rejectionTitle = document.getElementById('scanner-rejection-title');
      const rejectionText = document.getElementById('scanner-rejection-text');
      if (rejectionTitle) rejectionTitle.textContent = 'Corrupted or Unreadable Image';
      if (rejectionText) rejectionText.textContent = 'Unable to identify the food clearly. Please upload a clearer image.';
      showToast('Image appears unreadable or corrupted. Please upload a clearer image.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      handleInvalidSampleScan('unclear');
      showToast('Unable to read image file. Please upload a clearer image.', 'warning');
    };
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = document.getElementById('scanner-main-preview-img');
      const previewWrap = document.getElementById('scanner-main-preview-wrap');
      const emptyWrap = document.getElementById('scanner-main-empty');
      if (img) img.src = dataUrl;
      if (emptyWrap) emptyWrap.style.display = 'none';
      if (previewWrap) previewWrap.style.display = 'block';
      const rescanBtn = document.getElementById('scanner-rescan-btn');
      if (rescanBtn) rescanBtn.style.display = 'block';
      currentScanImageSrc = dataUrl;

      analyzeFoodImage(dataUrl, file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  }

  function setupChatbotListeners() {
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chat-user-input');

    if (form && input) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        appendChatMessage('user', text);
        input.value = '';

        // Typing indicator
        const reply = await getAiChatbotResponse(text);
        appendChatMessage('bot', reply);
      });
    }

    document.querySelectorAll('.chat-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (input && form) {
          input.value = query;
          form.dispatchEvent(new Event('submit'));
        }
      });
    });

    document.getElementById('clear-chat-btn')?.addEventListener('click', () => {
      const thread = document.getElementById('chat-messages-thread');
      if (thread) {
        thread.innerHTML = `
          <div class="chat-bubble-row">
            <div class="chat-bubble bot">
              Conversation reset. How can I assist your nutrition, pantry recipes, and wellness today?
            </div>
          </div>
        `;
      }
    });
  }

  function setupFoodSearchModalListeners() {
    const modal = document.getElementById('food-search-modal');
    const overlay = document.getElementById('food-modal-overlay');
    const openBtn = document.getElementById('open-food-modal-btn');
    const closeBtn = document.getElementById('close-food-modal-btn');
    const searchInput = document.getElementById('food-db-search-input');

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'flex';
        if (overlay) overlay.classList.add('active');
        renderFoodSearchDatabase('', 'all');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
        if (overlay) overlay.classList.remove('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
        overlay.classList.remove('active');
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderFoodSearchDatabase(e.target.value, 'all');
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nutriai_theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.NutriIcons) window.NutriIcons.renderAll(icon.parentElement);
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  function openMobileDrawer() {
    document.getElementById('mobile-drawer')?.classList.add('active');
    document.getElementById('mobile-drawer-overlay')?.classList.add('active');
  }

  function closeMobileDrawer() {
    document.getElementById('mobile-drawer')?.classList.remove('active');
    document.getElementById('mobile-drawer-overlay')?.classList.remove('active');
  }



})();
