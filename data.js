/**
 * ATHLETIX Data Store - Rich realistic datasets for facilities, tournaments, coaches,
 * community posts, players, and admin analytics.
 */

const ATHLETIX_DATA = {
  // Sports Catalog
  sports: [
    { id: 'football', name: 'Football / Turf', icon: '⚽', activePlayers: '8.4K', color: '#00C853' },
    { id: 'cricket', name: 'Box Cricket', icon: '🏏', activePlayers: '11.2K', color: '#00E5FF' },
    { id: 'badminton', name: 'Badminton', icon: '🏸', activePlayers: '6.7K', color: '#FFD600' },
    { id: 'basketball', name: 'Basketball', icon: '🏀', activePlayers: '4.9K', color: '#FF6D00' },
    { id: 'tennis', name: 'Lawn Tennis', icon: '🎾', activePlayers: '3.1K', color: '#76FF03' },
    { id: 'padel', name: 'Padel Tennis', icon: '🏓', activePlayers: '2.5K', color: '#E040FB' },
    { id: 'swimming', name: 'Swimming', icon: '🏊', activePlayers: '1.9K', color: '#00B0FF' },
    { id: 'volleyball', name: 'Volleyball', icon: '🏐', activePlayers: '2.8K', color: '#FFAB00' }
  ],

  // Facilities Dataset (12 top-tier sports venues)
  facilities: [
    {
      id: 'fac-1',
      name: 'Allianz Apex Arena & FIFA Turf',
      sport: 'football',
      sportName: 'Football / Turf',
      location: 'Downtown Sports City, Sector 4',
      distance: '1.2 km',
      rating: 4.95,
      reviewCount: 342,
      pricePerHour: 4300,
      currency: '₹',
      badge: 'FIFA Quality Pro',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Flood Lights', 'Indoor/Outdoor', 'Changing Room', 'Parking', 'Equipment Rental', 'Live Streaming'],
      courtTypes: ['7v7 AstroTurf', '5v5 Cage Turf', 'Full 11v11 Pitch'],
      availableSlotsToday: 7,
      overview: 'State of the art FIFA-certified 60mm monofilament turf with 1200 Lux broadcast-level floodlighting, digital scoreboard, and locker facilities with warm showers.',
      rules: ['Studs allowed on main pitch only', 'Shin guards mandatory', 'Arrive 15 mins prior']
    },
    {
      id: 'fac-2',
      name: 'Skyline Indoor Cricket & Bowling Hub',
      sport: 'cricket',
      sportName: 'Box Cricket',
      location: 'Metro Central Hub, Bayview',
      distance: '2.4 km',
      rating: 4.88,
      reviewCount: 218,
      pricePerHour: 3800,
      currency: '₹',
      badge: 'Speed Gun & Replay',
      image: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Indoor/Outdoor', 'Parking', 'Equipment Rental', 'Changing Room', 'Live Streaming'],
      courtTypes: ['Pro Box Turf A', 'Bowling Machine Pitch B', 'Standard Box C'],
      availableSlotsToday: 5,
      overview: 'Fully enclosed indoor air-conditioned box cricket stadium equipped with Merlyn spin/pace bowling machines, smart sensor batting trackers, and digital scoreboards.',
      rules: ['Tennis ball only', 'Non-marking flat shoes mandatory', 'Maximum 16 players per box']
    },
    {
      id: 'fac-3',
      name: 'Yonex BWF Grand Badminton Court',
      sport: 'badminton',
      sportName: 'Badminton',
      location: 'Olympic Park, West Wing',
      distance: '3.1 km',
      rating: 4.92,
      reviewCount: 410,
      pricePerHour: 2650,
      currency: '₹',
      badge: 'BWF Grade 1 Mat',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Indoor/Outdoor', 'Changing Room', 'Parking', 'Equipment Rental', 'Physio On-Site'],
      courtTypes: ['Court 1 (Yonex Mat)', 'Court 2 (Yonex Mat)', 'Court 3 (Teak Wood)', 'Court 4 (Teak Wood)'],
      availableSlotsToday: 4,
      overview: '6-court professional indoor arena with anti-glare vertical LED lighting, 8mm Olympic shock-absorbing rubberized flooring, and Yonex stringing station.',
      rules: ['Strictly non-marking shoes', 'No black soles allowed', 'Rackets available for rent']
    },
    {
      id: 'fac-4',
      name: 'Viper Hoops Hardwood Basketball Dome',
      sport: 'basketball',
      sportName: 'Basketball',
      location: 'Uptown Arena, East District',
      distance: '4.0 km',
      rating: 4.85,
      reviewCount: 195,
      pricePerHour: 3600,
      currency: '₹',
      badge: 'NBA Regulation',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Indoor/Outdoor', 'Flood Lights', 'Changing Room', 'Parking', 'Live Streaming'],
      courtTypes: ['Full Hardwood Court 1', '3x3 Half Court A', '3x3 Half Court B'],
      availableSlotsToday: 9,
      overview: 'Premium maple hardwood sprung flooring, glass break-away backboards, shot clock displays, and sideline viewing stands.',
      rules: ['Basketball shoes required', 'No food/drinks on court except water', 'Respect scheduled time']
    },
    {
      id: 'fac-5',
      name: 'Grand Slam Clay & Acrylic Tennis Club',
      sport: 'tennis',
      sportName: 'Lawn Tennis',
      location: 'Riverside Club, North Hills',
      distance: '5.2 km',
      rating: 4.97,
      reviewCount: 164,
      pricePerHour: 4750,
      currency: '₹',
      badge: 'ATP Approved',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Flood Lights', 'Indoor/Outdoor', 'Changing Room', 'Parking', 'Equipment Rental'],
      courtTypes: ['Red Clay Court 1', 'Hard Acrylic Court 2', 'Hard Acrylic Court 3 (Covered)'],
      availableSlotsToday: 6,
      overview: 'Roland Garros style premium red clay and cushioned DecoTurf acrylic courts with night illumination, ball boy service on request, and club lounge.',
      rules: ['Tennis attire required', 'Clay court maintenance drag after match']
    },
    {
      id: 'fac-6',
      name: 'Nova Padel & Social Club',
      sport: 'padel',
      sportName: 'Padel Tennis',
      location: 'Marina Promenade, Pier 9',
      distance: '2.8 km',
      rating: 4.91,
      reviewCount: 280,
      pricePerHour: 4000,
      currency: '₹',
      badge: 'Panoramic Glass',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Flood Lights', 'Parking', 'Equipment Rental', 'Cafe & Lounge', 'Changing Room'],
      courtTypes: ['Panoramic Court 1', 'Panoramic Court 2', 'Center Court Pro'],
      availableSlotsToday: 8,
      overview: 'Ultra-modern panoramic glass padel courts with Mondo Supercourt turf, ambient music, rooftop sports cafe, and high-precision video playback.',
      rules: ['Padel shoes or clean sneakers required', 'Racket rental available at counter']
    },
    {
      id: 'fac-7',
      name: 'Titan Arena 5G Football Dome',
      sport: 'football',
      sportName: 'Football / Turf',
      location: 'South Tech Hub, Cyber Corridor',
      distance: '3.7 km',
      rating: 4.89,
      reviewCount: 305,
      pricePerHour: 4550,
      currency: '₹',
      badge: 'All-Weather Covered',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Indoor/Outdoor', 'Flood Lights', 'Changing Room', 'Parking', 'Equipment Rental'],
      courtTypes: ['Covered 6v6 Turf', 'Open 8v8 Turf'],
      availableSlotsToday: 3,
      overview: 'Weatherproof indoor dome featuring temperature control, shock pad underlay, electronic substitution boards, and spectator gallery.',
      rules: ['Turf shoes only', 'No metal studs allowed']
    },
    {
      id: 'fac-8',
      name: 'AquaStride 50m Heated Olympic Pool',
      sport: 'swimming',
      sportName: 'Swimming',
      location: 'Aquatic Center, South Gate',
      distance: '6.1 km',
      rating: 4.93,
      reviewCount: 140,
      pricePerHour: 2100,
      currency: '₹',
      badge: 'Heated & Ozone Treated',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Indoor/Outdoor', 'Changing Room', 'Parking', 'Lockers', 'Sauna & Steam'],
      courtTypes: ['Lane 1-4 (Fast Pace)', 'Lane 5-8 (Open Swim)', 'Diving Well'],
      availableSlotsToday: 11,
      overview: 'Olympic 50-meter 10-lane competition heated pool with ozone micro-filtration, underwater stroke analysis cameras, and Finnish steam saunas.',
      rules: ['Swim cap & goggles mandatory', 'Shower before pool entry']
    }
  ],

  // Tournaments Dataset (Live, Upcoming, Completed with prize pools & brackets)
  tournaments: [
    {
      id: 'tour-1',
      title: 'Champions League 7v7 Turf Cup 2026',
      sport: 'football',
      sportName: 'Football',
      status: 'live', // live, upcoming, completed
      prizePool: '₹14,25,000',
      entryFee: '₹17,100 / team',
      startDate: '2026-08-15',
      endDate: '2026-08-18',
      targetDate: new Date(Date.now() + 38 * 3600 * 1000).toISOString(),
      location: 'Allianz Apex Arena, Pitch 1 & 2',
      registeredTeams: 28,
      maxTeams: 32,
      organizer: 'Athletix Elite League & Red Bull',
      format: '7v7 Knockout + Group Stage',
      banner: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      currentStage: 'Quarter Finals',
      bracket: {
        quarterFinals: [
          { teamA: 'Viper FC', scoreA: 3, teamB: 'Apex Strikers', scoreB: 2, status: 'completed' },
          { teamA: 'Neon Knights', scoreA: 1, teamB: 'Cyber Phoenix', scoreB: 4, status: 'completed' },
          { teamA: 'Metro United', scoreA: 2, teamB: 'Red Star FC', scoreB: 0, status: 'live' },
          { teamA: 'Thunder Strikers', scoreA: 0, teamB: 'Blaze 7s', scoreB: 0, status: 'scheduled' }
        ],
        semiFinals: [
          { teamA: 'Viper FC', scoreA: null, teamB: 'Cyber Phoenix', scoreB: null, status: 'scheduled' },
          { teamA: 'Metro United', scoreA: null, teamB: 'TBD', scoreB: null, status: 'scheduled' }
        ],
        finals: [
          { teamA: 'TBD', scoreA: null, teamB: 'TBD', scoreB: null, status: 'scheduled' }
        ]
      },
      leaderboard: [
        { rank: 1, team: 'Viper FC', played: 4, won: 4, gd: '+11', pts: 12, medal: '🥇' },
        { rank: 2, team: 'Cyber Phoenix', played: 4, won: 3, gd: '+8', pts: 9, medal: '🥈' },
        { rank: 3, team: 'Metro United', played: 3, won: 3, gd: '+6', pts: 9, medal: '🥉' },
        { rank: 4, team: 'Apex Strikers', played: 4, won: 2, gd: '+2', pts: 6, medal: '' }
      ],
      rules: '15 mins halves. FIFA rules apply. Rolling substitutions. Yellow card = 2 min sin bin.'
    },
    {
      id: 'tour-2',
      title: 'Grand Smash Open Badminton Championship',
      sport: 'badminton',
      sportName: 'Badminton',
      status: 'upcoming',
      prizePool: '₹8,08,000',
      entryFee: '₹5,700 / player',
      startDate: '2026-08-22',
      endDate: '2026-08-24',
      targetDate: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString(),
      location: 'Yonex BWF Grand Badminton Court',
      registeredTeams: 42,
      maxTeams: 64,
      organizer: 'BWF Regional Committee',
      format: 'Singles & Doubles Knockout',
      banner: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
      currentStage: 'Registrations Closing Soon',
      bracket: null,
      leaderboard: [],
      rules: 'BWF scoring: Best of 3 sets, 21 points per set. Feather shuttles provided.'
    },
    {
      id: 'tour-3',
      title: 'Premier Box Cricket Super 8 Cup',
      sport: 'cricket',
      sportName: 'Box Cricket',
      status: 'upcoming',
      prizePool: '₹9,50,000',
      entryFee: '₹13,300 / team',
      startDate: '2026-08-28',
      endDate: '2026-08-30',
      targetDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
      location: 'Skyline Indoor Cricket & Bowling Hub',
      registeredTeams: 19,
      maxTeams: 24,
      organizer: 'National Box Cricket League',
      format: '8-a-side 6 Over Blitz',
      banner: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
      currentStage: 'Early Bird Registration Open',
      bracket: null,
      leaderboard: [],
      rules: '6 overs per innings. Direct hit = 6 runs. Wall rebound catches allowed.'
    },
    {
      id: 'tour-4',
      title: 'HoopFest 3x3 Streetball Showdown',
      sport: 'basketball',
      sportName: 'Basketball',
      status: 'live',
      prizePool: '₹5,70,000',
      entryFee: '₹7,600 / team',
      startDate: '2026-08-14',
      endDate: '2026-08-16',
      targetDate: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
      location: 'Viper Hoops Hardwood Basketball Dome',
      registeredTeams: 16,
      maxTeams: 16,
      organizer: 'FIBA 3x3 Endorsed',
      format: 'FIBA 3x3 10-Minute Rapid',
      banner: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
      currentStage: 'Semi Finals',
      bracket: {
        quarterFinals: [
          { teamA: 'Dunk Dynasty', scoreA: 21, teamB: 'Sky Hooks', scoreB: 14, status: 'completed' },
          { teamA: 'Court Kings', scoreA: 19, teamB: 'Ankle Breakers', scoreB: 18, status: 'completed' }
        ],
        semiFinals: [
          { teamA: 'Dunk Dynasty', scoreA: 15, teamB: 'Court Kings', scoreB: 12, status: 'live' }
        ],
        finals: [
          { teamA: 'TBD', scoreA: null, teamB: 'TBD', scoreB: null, status: 'scheduled' }
        ]
      },
      leaderboard: [
        { rank: 1, team: 'Dunk Dynasty', played: 3, won: 3, gd: '+22', pts: 6, medal: '🥇' },
        { rank: 2, team: 'Court Kings', played: 3, won: 2, gd: '+8', pts: 4, medal: '🥈' },
        { rank: 3, team: 'Sky Hooks', played: 2, won: 1, gd: '-3', pts: 2, medal: '🥉' }
      ],
      rules: '12 second shot clock. First to 21 points or highest score in 10 minutes.'
    },
    {
      id: 'tour-5',
      title: 'Summer Clay Masters Tennis Classic',
      sport: 'tennis',
      sportName: 'Lawn Tennis',
      status: 'completed',
      prizePool: '₹11,40,000',
      entryFee: '₹8,550 / player',
      startDate: '2026-07-25',
      endDate: '2026-07-28',
      targetDate: new Date(Date.now() - 17 * 24 * 3600 * 1000).toISOString(),
      location: 'Grand Slam Clay & Acrylic Tennis Club',
      registeredTeams: 32,
      maxTeams: 32,
      organizer: 'Global Racquet Tour',
      format: 'Best of 3 Sets Knockout',
      banner: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80',
      currentStage: 'Concluded',
      bracket: null,
      leaderboard: [
        { rank: 1, team: 'Alexandre Rivera', played: 5, won: 5, gd: '+10 sets', pts: 1000, medal: '🏆 Winner' },
        { rank: 2, team: 'Mateo Rossi', played: 5, won: 4, gd: '+7 sets', pts: 600, medal: '🥈 Runner Up' },
        { rank: 3, team: 'David Chen', played: 4, won: 3, gd: '+4 sets', pts: 360, medal: '🥉 Semi Finalist' }
      ],
      rules: 'Standard ITF rules. Tiebreak at 6-6.'
    }
  ],

  // Coaches Dataset (Verified mentors with credentials, badges, hourly rates & reviews)
  coaches: [
    {
      id: 'coach-1',
      name: 'Marcus "Viper" Sterling',
      title: 'UEFA-A Licensed Pro Football Coach',
      sport: 'football',
      sportName: 'Football',
      experience: '11 Years',
      rating: 4.98,
      reviewCount: 184,
      hourlyRate: 6200,
      currency: '₹',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
      badges: ['UEFA-A Certified', 'Former Pro Striker', 'AI Video Analyst'],
      languages: ['English', 'Spanish', 'Portuguese'],
      specialties: ['Tactical Positioning', 'High-Speed Finishing', 'Agility & First Touch'],
      bio: 'Ex-Championship striker specializing in elite attacking mechanics, mental conditioning, and modern pressing tactics with personalized AI telemetry reports.',
      achievements: ['Trained 14 academy players drafted into top clubs', 'State Cup Winner 2023 & 2024'],
      availableSlots: ['Mon, Wed, Fri (6 PM - 9 PM)', 'Sat (8 AM - 1 PM)'],
      programs: [
        { name: '1-on-1 Elite Striker Mastery', duration: '60 mins', price: '₹6,200' },
        { name: 'Squad Tactical Clinic (5-8 players)', duration: '90 mins', price: '₹13,300' }
      ]
    },
    {
      id: 'coach-2',
      name: 'Rohit Sharma-Gupta',
      title: 'BCCI Level-3 Certified Cricket Master Coach',
      sport: 'cricket',
      sportName: 'Cricket',
      experience: '14 Years',
      rating: 4.94,
      reviewCount: 230,
      hourlyRate: 5200,
      currency: '₹',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1000&q=80',
      badges: ['BCCI Level-3', 'High Performance Coach', 'Biomechanics Lead'],
      languages: ['English', 'Hindi', 'Gujarati'],
      specialties: ['Power Hitting Technique', 'Pace Bowling Mechanics', 'Mental Toughness'],
      bio: 'Master coach focusing on stroke refinement, high-speed camera wrist angles, and match scenario pressure drills.',
      achievements: ['Chief Coach at Apex Cricket Academy', 'Ranji Trophy Batting Consultant'],
      availableSlots: ['Tue, Thu, Sat (5 PM - 9 PM)', 'Sun (7 AM - 12 PM)'],
      programs: [
        { name: 'Batting Biomechanics & Power Hitting', duration: '60 mins', price: '₹5,200' },
        { name: 'Bowling Action Speed Optimization', duration: '60 mins', price: '₹5,200' }
      ]
    },
    {
      id: 'coach-3',
      name: 'Li Wei "Smash" Chen',
      title: 'BWF International Badminton Coach',
      sport: 'badminton',
      sportName: 'Badminton',
      experience: '9 Years',
      rating: 4.96,
      reviewCount: 162,
      hourlyRate: 4750,
      currency: '₹',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
      badges: ['BWF Coach Level-2', 'Asian Games Silver 2018', 'Footwork Specialist'],
      languages: ['English', 'Mandarin'],
      specialties: ['Deceptive Drop Shots', 'Fast Shadow Footwork', 'Smash Velocity Boost'],
      bio: 'Former national squad player dedicated to transforming amateur footwork into lightning court coverage and razor-sharp net deception.',
      achievements: ['National Junior Championship Coach of the Year', 'Over 400 athletes trained'],
      availableSlots: ['Mon, Wed, Fri (7 AM - 11 AM)', 'Sat, Sun (4 PM - 8 PM)'],
      programs: [
        { name: 'Advanced Footwork & Net Play Masterclass', duration: '60 mins', price: '₹4,750' },
        { name: 'Doubles Rotation & Serve Return Strategy', duration: '90 mins', price: '₹8,550' }
      ]
    },
    {
      id: 'coach-4',
      name: 'Elena "Laser" Petrova',
      title: 'ITF Level-3 High Performance Tennis Pro',
      sport: 'tennis',
      sportName: 'Lawn Tennis',
      experience: '12 Years',
      rating: 4.92,
      reviewCount: 145,
      hourlyRate: 6650,
      currency: '₹',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80',
      badges: ['ITF Certified', 'Former WTA 220', 'Serve Speed Coach'],
      languages: ['English', 'Russian', 'French'],
      specialties: ['Kick & Flat Serve Masterclass', 'Heavy Topspin Forehand', 'Court Geometry'],
      bio: 'Pro circuit veteran helping players conquer clay and hard court fundamentals through video trajectory analysis and dynamic baseline rallies.',
      achievements: ['Junior Grand Slam Finalist Coach', 'Certified Strength & Conditioning Pro'],
      availableSlots: ['Mon - Fri (7 AM - 10 AM, 4 PM - 7 PM)'],
      programs: [
        { name: '1-on-1 Forehand & Serve Precision Clinic', duration: '60 mins', price: '₹6,650' }
      ]
    },
    {
      id: 'coach-5',
      name: 'Darius "Flight" King',
      title: 'USAB Gold Certified Basketball Coach',
      sport: 'basketball',
      sportName: 'Basketball',
      experience: '10 Years',
      rating: 4.91,
      reviewCount: 198,
      hourlyRate: 5500,
      currency: '₹',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
      badges: ['USAB Gold Licensed', 'D1 College Alumni', 'Plyometrics Coach'],
      languages: ['English'],
      specialties: ['Handles & Separation', 'Shooting Arc Correction', 'Defensive Lockdown'],
      bio: 'High-intensity skills trainer who builds explosive first steps, fluid pull-up jumpers, and unbreakable floor vision.',
      achievements: ['Trained 8 NCAA scholarship athletes', 'Nike Skills Camp Lead Trainer'],
      availableSlots: ['Tue, Thu, Sat (3 PM - 8 PM)', 'Sun (10 AM - 3 PM)'],
      programs: [
        { name: 'Handles & Shooting Arc Transformation', duration: '60 mins', price: '₹5,500' }
      ]
    },
    {
      id: 'coach-6',
      name: 'Maya Lin-Hoffman',
      title: 'ASCA Level-4 Performance Swim Coach',
      sport: 'swimming',
      sportName: 'Swimming',
      experience: '8 Years',
      rating: 4.95,
      reviewCount: 112,
      hourlyRate: 4550,
      currency: '₹',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80',
      badges: ['ASCA Level 4', 'Aquatic Biomechanist', 'Triathlon Prep'],
      languages: ['English', 'German'],
      specialties: ['Freestyle Catch Efficiency', 'Underwater Video Analysis', 'Endurance Pacing'],
      bio: 'Specialist in hydrodynamic drag reduction, high-elbow catch, and oxygen-efficient breathing patterns for competitive swimmers and triathletes.',
      achievements: ['National Age-Group Record Coach', 'Master Swim Champion'],
      availableSlots: ['Mon, Wed, Fri (6 AM - 10 AM)', 'Sat (7 AM - 12 PM)'],
      programs: [
        { name: 'Hydrodynamic Stroke Correction Clinic', duration: '60 mins', price: '₹4,550' }
      ]
    }
  ],

  // Community Posts Dataset (Rich social sports feed)
  communityPosts: [
    {
      id: 'post-1',
      author: 'Karan "Striker" Kapoor',
      handle: '@karan_striker',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Player • Diamond Striker',
      timestamp: '20 mins ago',
      sport: 'football',
      sportBadge: '⚽ Football',
      content: '🚨 Need 2 aggressive wingers / playmakers for our 7v7 squad this Friday night at Allianz Apex Arena! Turf is booked for 8:00 PM. High pace game. Hit the button if you want to join our squad via Athletix AI Match!',
      media: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
      likes: 48,
      isLiked: false,
      comments: [
        { author: 'Vikram Mehta', handle: '@vikram_m', text: 'I play LW / CAM, right footed with 88 stamina. Sent you a match request!', time: '12m ago' },
        { author: 'Sarah Jenkins', handle: '@s_jenkins', text: 'Played with Karan last week — super organized game and top tier turf. Count me in!', time: '5m ago' }
      ],
      shares: 12,
      tags: ['#TurfFootball', '#FridayNight7s', '#AIMatchmaker']
    },
    {
      id: 'post-2',
      author: 'Coach Marcus Sterling',
      handle: '@coach_marcus',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Verified Coach • UEFA-A',
      timestamp: '2 hours ago',
      sport: 'football',
      sportBadge: '🎯 Pro Tip',
      content: '⚡ Three key adjustments to add 15% more power to your shooting stroke without losing accuracy:\n1. Plant foot pointing 15° toward target.\n2. Lock your ankle completely rigid upon impact.\n3. Keep chest tilted slightly over the ball to prevent ballooning over the crossbar.\n\nTry this in your next practice session!',
      media: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      likes: 124,
      isLiked: true,
      comments: [
        { author: 'Liam Gallagher', handle: '@liam_g', text: 'The chest tilt tip changed my freekicks immediately. Quality drill coach!', time: '1h ago' }
      ],
      shares: 34,
      tags: ['#Drills', '#StrikerTraining', '#AthletixAcademy']
    },
    {
      id: 'post-3',
      author: 'Ananya Deshmukh',
      handle: '@ananya_smash',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Player • BWF Tier 1',
      timestamp: '4 hours ago',
      sport: 'badminton',
      sportBadge: '🏸 Badminton',
      content: '🏆 We took home the Silver Medal at the Grand Badminton Masters yesterday! Big shoutout to my doubles partner Rhea and Coach Li Wei for the high-intensity jump smash routines. Onwards to the next championship next month!',
      media: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
      likes: 89,
      isLiked: false,
      comments: [
        { author: 'Coach Li Wei', handle: '@liwei_coach', text: 'Phenomenal net interception in the final set! Extremely proud of you both.', time: '3h ago' }
      ],
      shares: 9,
      tags: ['#BadmintonDoubles', '#SilverMedal', '#AthletixCommunity']
    },
    {
      id: 'post-4',
      author: 'Red Bull Box Cricket League',
      handle: '@redbull_cricket',
      avatar: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=200&q=80',
      role: 'Official Tournament Organizer',
      timestamp: '7 hours ago',
      sport: 'cricket',
      sportBadge: '🏏 Tournament Alert',
      content: '🔥 REGISTRATIONS ARE 80% FULL! Only 5 team slots remaining for the Super 8 Blitz Cup with a ₹9,50,000 Prize Pool. Live streaming with DRS and smart speed guns at Skyline Indoor Hub. Register your team before midnight!',
      media: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      likes: 176,
      isLiked: false,
      comments: [
        { author: 'Rohit S.', handle: '@rohit_crick', text: 'Just registered "Thunder Bolts"! See everyone on the turf.', time: '5h ago' }
      ],
      shares: 55,
      tags: ['#BoxCricket', '#Super8Cup', '#CashPrize']
    }
  ],

  // Suggested Athletes to Connect
  suggestedPlayers: [
    {
      id: 'sug-1',
      name: 'Vikram Mehta',
      handle: '@vikram_m',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      sport: 'Football • Winger',
      skill: 'Level 8 - Pro',
      compatibility: '96%',
      status: 'connect' // 'connect', 'requested', 'connected'
    },
    {
      id: 'sug-2',
      name: 'Rhea Sen',
      handle: '@rhea_badminton',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      sport: 'Badminton • Singles',
      skill: 'Level 9 - Elite',
      compatibility: '92%',
      status: 'connect'
    },
    {
      id: 'sug-3',
      name: 'David Miller',
      handle: '@miller_dunk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      sport: 'Basketball • Point Guard',
      skill: 'Level 7 - Semi Pro',
      compatibility: '88%',
      status: 'connect'
    }
  ],

  // Trending Topics
  trendingTopics: [
    { tag: '#SundayTurfLeague', posts: '2.4K posts', sport: 'Football' },
    { tag: '#AIPlayerMatch', posts: '1.8K posts', sport: 'AI Matching' },
    { tag: '#Super8BoxCricket', posts: '1.2K posts', sport: 'Cricket' },
    { tag: '#YonexGrandMasters', posts: '980 posts', sport: 'Badminton' },
    { tag: '#NightPickups', posts: '740 posts', sport: 'Community' }
  ],

  // Active User Profile (Current logged-in athlete)
  currentUser: {
    id: 'user-001',
    name: 'Zoya Khan',
    handle: '@zoya_khan',
    role: 'Diamond Athlete',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    city: 'Mumbai, Maharashtra',
    bio: 'Competitive striker & box cricket all-rounder. 2x MVP in Bay Turf Series. Love high-intensity 7v7 and badminton drills.',
    primarySports: ['Football / Turf', 'Box Cricket', 'Badminton'],
    skillTier: 'Diamond Tier 9',
    stats: {
      matchesPlayed: 148,
      wins: 112,
      winRate: '75.6%',
      mvpCount: 29,
      tournamentsWon: 6,
      hoursTrained: 320,
      followers: 840,
      following: 215
    },
    skillRadar: {
      speed: 92,
      stamina: 88,
      technique: 94,
      teamwork: 90,
      power: 86
    },
    badges: [
      { name: 'MVP 2025', icon: '🏆', desc: 'Awarded Most Valuable Player in Metro Championship' },
      { name: 'Century Club', icon: '⚡', desc: 'Completed 100+ verified match bookings' },
      { name: 'Fair Play Icon', icon: '🛡️', desc: '100% positive sportsman rating across 140 matches' },
      { name: 'Hat-trick Hero', icon: '⚽', desc: 'Scored 3+ goals in 8 tournament fixtures' }
    ],
    upcomingBookings: [
      {
        id: 'bk-901',
        title: '7v7 Football Clash',
        facility: 'Allianz Apex Arena (Pitch 1)',
        date: 'Tomorrow, Aug 15',
        time: '08:00 PM - 09:00 PM',
        status: 'Confirmed',
        court: '7v7 AstroTurf Pitch A',
        qrCode: 'ATH-7798-FIFA-APEX'
      },
      {
        id: 'bk-902',
        title: 'Badminton Doubles Drills',
        facility: 'Yonex BWF Grand Badminton Court',
        date: 'Sunday, Aug 17',
        time: '10:00 AM - 11:00 AM',
        status: 'Confirmed',
        court: 'Court 1 (Yonex Mat)',
        qrCode: 'ATH-4432-YONEX-BWF'
      }
    ],
    matchHistory: [
      { match: 'Apex Strikers vs Viper FC (7v7)', score: '3 - 2 (W)', role: 'Striker (2 Goals)', date: 'Aug 10, 2026', venue: 'Allianz Arena' },
      { match: 'Super 8 Box Cricket Final', score: '64/2 vs 58/6 (W)', role: 'All-Rounder (28 runs, 2 wkts)', date: 'Aug 04, 2026', venue: 'Skyline Hub' },
      { match: 'Metro Badminton Doubles Semis', score: '21-19, 21-18 (W)', role: 'Doubles Left', date: 'Jul 28, 2026', venue: 'Yonex Court' }
    ]
  },

  // Admin Analytics Dataset
  adminAnalytics: {
    kpis: {
      totalRevenue: '₹1,40,84,000',
      revenueChange: '+24.8% vs last month',
      activeBookings: '1,842',
      bookingsChange: '+18.2% this week',
      registeredPlayers: '25,430',
      playersChange: '+1,240 new athletes',
      verifiedCoaches: '512',
      coachesChange: '+45 verified',
      payoutsIssued: '₹40,00,000'
    },
    monthlyRevenue: [
      { month: 'Jan', revenue: 65, bookings: 780 },
      { month: 'Feb', revenue: 78, bookings: 920 },
      { month: 'Mar', revenue: 92, bookings: 1100 },
      { month: 'Apr', revenue: 105, bookings: 1250 },
      { month: 'May', revenue: 118, bookings: 1420 },
      { month: 'Jun', revenue: 132, bookings: 1600 },
      { month: 'Jul', revenue: 142, bookings: 1750 },
      { month: 'Aug', revenue: 148, bookings: 1842 }
    ],
    sportsBreakdown: [
      { sport: 'Football / Turf', percentage: 38, revenue: '₹53.48L', color: '#00C853' },
      { sport: 'Box Cricket', percentage: 28, revenue: '₹39.42L', color: '#00E5FF' },
      { sport: 'Badminton', percentage: 16, revenue: '₹22.52L', color: '#FFD600' },
      { sport: 'Basketball', percentage: 10, revenue: '₹14.06L', color: '#FF6D00' },
      { sport: 'Tennis & Padel', percentage: 8, revenue: '₹11.30L', color: '#E040FB' }
    ],
    recentBookingsTable: [
      { id: 'TX-8821', player: 'Zoya Khan', facility: 'Allianz Apex Arena', sport: 'Football', amount: '₹4,300.00', date: 'Aug 14, 08:30 PM', status: 'Confirmed' },
      { id: 'TX-8820', player: 'Vikram Mehta', facility: 'Skyline Cricket Hub', sport: 'Cricket', amount: '₹3,800.00', date: 'Aug 14, 07:15 PM', status: 'Confirmed' },
      { id: 'TX-8819', player: 'Sarah Jenkins', facility: 'Yonex Badminton Court', sport: 'Badminton', amount: '₹2,650.00', date: 'Aug 14, 06:40 PM', status: 'Pending' },
      { id: 'TX-8818', player: 'David Miller', facility: 'Viper Hoops Hardwood', sport: 'Basketball', amount: '₹3,600.00', date: 'Aug 14, 05:20 PM', status: 'Confirmed' },
      { id: 'TX-8817', player: 'Elena Petrova (Coach)', facility: 'Grand Slam Tennis Club', sport: 'Tennis', amount: '₹6,650.00', date: 'Aug 14, 04:00 PM', status: 'Completed' },
      { id: 'TX-8816', player: 'Marcus Sterling (Coach)', facility: 'Titan Arena 5G', sport: 'Football', amount: '₹6,200.00', date: 'Aug 14, 02:30 PM', status: 'Confirmed' }
    ]
  },

  // Sports Facility Gallery Images
  galleryImages: [
    // Football Images
    { id: 'gal-fb-1', sport: 'football', name: 'fb1.webp', path: 'images/fb1.webp', label: 'Football Turf' },
    { id: 'gal-fb-2', sport: 'football', name: 'fb2.webp', path: 'images/fb2.webp', label: 'Football Match' },
    { id: 'gal-fb-3', sport: 'football', name: 'fb3.jpeg', path: 'images/fb3.jpeg', label: 'Football Field' },
    { id: 'gal-fb-4', sport: 'football', name: 'fb4.jpg', path: 'images/fb4.jpg', label: 'Football Stadium' },
    { id: 'gal-fb-5', sport: 'football', name: 'fb5.jpg', path: 'images/fb5.jpg', label: 'Football Pitch' },
    
    // Cricket Images
    { id: 'gal-cr-1', sport: 'cricket', name: 'cricket1.jpg', path: 'images/cricket1.jpg', label: 'Cricket Box' },
    { id: 'gal-cr-2', sport: 'cricket', name: 'cricket2.jpg', path: 'images/cricket2.jpg', label: 'Cricket Pitch' },
    { id: 'gal-cr-3', sport: 'cricket', name: 'cricket 3.jpg', path: 'images/cricket 3.jpg', label: 'Cricket Stadium' },
    { id: 'gal-cr-4', sport: 'cricket', name: 'cricket4.jpg', path: 'images/cricket4.jpg', label: 'Cricket Arena' },
    { id: 'gal-cr-5', sport: 'cricket', name: 'cricket5.jpg', path: 'images/cricket5.jpg', label: 'Cricket Ground' },
    
    // Tennis Images
    { id: 'gal-tn-1', sport: 'tennis', name: 'tennis1.jpeg', path: 'images/tennis1.jpeg', label: 'Tennis Court' },
    { id: 'gal-tn-2', sport: 'tennis', name: 'tennis2.jpeg', path: 'images/tennis2.jpeg', label: 'Tennis Match' },
    { id: 'gal-tn-3', sport: 'tennis', name: 'tennis3.jpeg', path: 'images/tennis3.jpeg', label: 'Tennis Arena' },
    { id: 'gal-tn-4', sport: 'tennis', name: 'tennis4.jpeg', path: 'images/tennis4.jpeg', label: 'Tennis Turf' },
    { id: 'gal-tn-5', sport: 'tennis', name: 'tennis5.jpeg', path: 'images/tennis5.jpeg', label: 'Tennis Stadium' },
    
    // Badminton Images
    { id: 'gal-bd-1', sport: 'badminton', name: 'badminton1.png', path: 'images/badminton1.png', label: 'Badminton Court' },
    { id: 'gal-bd-2', sport: 'badminton', name: 'badminton2.png', path: 'images/badminton2.png', label: 'Badminton Match' },
    { id: 'gal-bd-3', sport: 'badminton', name: 'badminton3.png', path: 'images/badminton3.png', label: 'Badminton Arena' },
    { id: 'gal-bd-4', sport: 'badminton', name: 'badminton4.png', path: 'images/badminton4.png', label: 'Badminton Turf' },
    { id: 'gal-bd-5', sport: 'badminton', name: 'badminton5.png', path: 'images/badminton5.png', label: 'Badminton Stadium' },
    
    // Basketball Images
    { id: 'gal-bk-1', sport: 'basketball', name: 'basketball1.png', path: 'images/basketball1.png', label: 'Basketball Court' },
    { id: 'gal-bk-2', sport: 'basketball', name: 'basketball2.png', path: 'images/basketball2.png', label: 'Basketball Match' },
    { id: 'gal-bk-3', sport: 'basketball', name: 'basketball3.png', path: 'images/basketball3.png', label: 'Basketball Arena' },
    { id: 'gal-bk-4', sport: 'basketball', name: 'basketball4.png', path: 'images/basketball4.png', label: 'Basketball Dome' },
    { id: 'gal-bk-5', sport: 'basketball', name: 'basketball5.png', path: 'images/basketball5.png', label: 'Basketball Stadium' },
    
    // Padel Tennis Images
    { id: 'gal-pd-1', sport: 'padel', name: 'padel1.png', path: 'images/padel1.png', label: 'Padel Court' },
    { id: 'gal-pd-2', sport: 'padel', name: 'padel2.png', path: 'images/padel2.png', label: 'Padel Match' },
    { id: 'gal-pd-3', sport: 'padel', name: 'padel3.png', path: 'images/padel3.png', label: 'Padel Arena' },
    { id: 'gal-pd-4', sport: 'padel', name: 'padel4.png', path: 'images/padel4.png', label: 'Padel Turf' },
    { id: 'gal-pd-5', sport: 'padel', name: 'padel5.png', path: 'images/padel5.png', label: 'Padel Stadium' }
  ]
};

window.ATHLETIX_DATA = ATHLETIX_DATA;