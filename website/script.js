var crsr = document.querySelector("#cursor");
var cursorBlur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  cursorBlur.style.left = dets.x - 250 + "px";
  cursorBlur.style.top = dets.y - 250 + "px";
});

var h4all = document.querySelectorAll("#nav h4");
h4all.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    crsr.style.scale = 3;
    crsr.style.border = "1px solid #fff";
    crsr.style.backgroundColor = "transparent";
  });
  elem.addEventListener("mouseleave", function () {
    crsr.style.scale = 1;
    crsr.style.border = "0px solid #95C11E";
    crsr.style.backgroundColor = "#95C11E";
  });
});

gsap.to("#nav", {
  backgroundColor: "#000",
  duration: 0.5,
  height: "110px",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "body",
    
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
  },
});

gsap.to("#main", {
  backgroundColor: "#000",
  scrollTrigger: {
    trigger: "#main",
    scroller: "body",
    // markers: true,
    start: "top -25%",
    end: "top -70%",
    scrub: 2,
  },
});

gsap.from("#about-us img,#about-us-in", {
  y: 90,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#about-us",
    scroller: "body",
    start: "top 70%",
    end: "top 65%",
    scrub: 1,
  },
});
gsap.from(".card", {
  scale: 0.8,
  // opacity:0,
  duration: 1,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".card",
    scroller: "body",
    
    start: "top 70%",
    end: "top 65%",
    scrub: 1,
  },
});
gsap.from("#colon1", {
  y: -70,
  x: -70,
  scrollTrigger: {
    trigger: "#colon1",
    scroller: "body",
    
    start: "top 55%",
    end: "top 45%",
    scrub: 4
  }
})
gsap.from("#colon2", {
  y: 70,
  x: 70,
  scrollTrigger: {
    trigger: "#colon1",
    scroller: "body",
    start: "top 55%",
    end: "top 45%",
    scrub: 4
  }
})
gsap.from("#page4 h1", {
  y: 50,
  scrollTrigger: {
    trigger: "#page4 h1",
    scroller: "body",
    start: "top 75%",
    end: "top 70%",
    scrub: 3,
  },
})

// Weather API Integration
class WeatherService {
  constructor() {
    this.apiKey = 'demo'; // Using demo data for now
    this.location = 'Sidcup, UK';
    this.init();
  }

  init() {
    this.updateWeather();
    // Update weather every 10 minutes
    setInterval(() => this.updateWeather(), 600000);
  }

  async updateWeather() {
    try {
      // For demo purposes, using mock data
      // In production, you would use: https://api.openweathermap.org/data/2.5/weather
      const mockWeatherData = this.getMockWeatherData();
      this.displayWeather(mockWeatherData);
    } catch (error) {
      console.log('Weather update error:', error);
      this.displayWeather(this.getMockWeatherData());
    }
  }

  getMockWeatherData() {
    const conditions = [
      { temp: 18, desc: 'Sunny', icon: '☀️' },
      { temp: 15, desc: 'Partly Cloudy', icon: '⛅' },
      { temp: 12, desc: 'Cloudy', icon: '☁️' },
      { temp: 10, desc: 'Light Rain', icon: '🌦️' },
      { temp: 22, desc: 'Clear', icon: '🌤️' }
    ];

    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  displayWeather(data) {
    const tempElement = document.getElementById('weather-temp');
    const descElement = document.getElementById('weather-desc');
    const iconElement = document.getElementById('weather-icon');

    if (tempElement) tempElement.textContent = `${data.temp}°C`;
    if (descElement) descElement.textContent = data.desc;
    if (iconElement) iconElement.textContent = data.icon;
  }

  getCurrentWeather() {
    const temp = document.getElementById('weather-temp')?.textContent || '18°C';
    const desc = document.getElementById('weather-desc')?.textContent || 'Sunny';
    return { temp, desc };
  }
}

// Enhanced AI Assistant with Weather Integration
class GolfAssistant {
  constructor() {
    this.chatContainer = document.getElementById('ai-chat-container');
    this.chatMessages = document.getElementById('ai-chat-messages');
    this.userInput = document.getElementById('ai-user-input');
    this.sendBtn = document.getElementById('ai-send-btn');
    this.assistantBtn = document.getElementById('ai-assistant-btn');
    this.closeBtn = document.getElementById('ai-close-chat');

    this.isOpen = false;
    this.isTyping = false;
    this.conversationHistory = [];
    this.weatherService = null;

    // Enhanced response database
    this.responses = {
      greetings: [
        "Hello! Welcome to Sidcup Family Golf! 🏌️‍♂️ How can I help you today?",
        "Hi there! I'm your golf assistant ready to help with bookings, tips, and facility info! ⛳",
        "Welcome to Sidcup Family Golf! Ask me about our TopTracer Range, lessons, or adventure golf! 🎯"
      ],
      facilities: {
        toptracer: {
          main: "Our TopTracer Range features 46 bays with cutting-edge technology! 🎯 Real-time ball tracking, distance measurement, and game modes make practice fun and effective.",
          details: "TopTracer technology shows ball flight path, distance, height, and landing spot. Perfect for improving accuracy and consistency!",
          booking: "TopTracer bays can be booked by calling 00000000000. Peak times fill up quickly, so book ahead!"
        },
        lessons: {
          main: "Professional golf lessons for all skill levels! 🏌️‍♂️ Our PGA qualified instructors use video analysis and personalized coaching.",
          beginner: "New to golf? Our beginner packages include equipment, basic techniques, and course etiquette. Perfect starting point!",
          advanced: "Advanced players get swing analysis, course management, and competitive preparation with our expert coaches.",
          junior: "Junior programs (ages 6-17) focus on fun learning with age-appropriate techniques and equipment."
        },
        adventure: {
          main: "Two amazing 18-hole dinosaur-themed crazy golf courses! 🦕 Perfect for families, dates, and group events.",
          course1: "Jurassic Course: Features T-Rex, Triceratops, and volcano obstacles. Moderate difficulty, great for beginners.",
          course2: "Prehistoric Course: More challenging with water features, caves, and moving dinosaurs. Perfect for experienced players!"
        },
        coffee: {
          main: "Our café serves fresh coffee, snacks, and light meals! ☕ Perfect spot to relax and watch the action.",
          menu: "Hot drinks, sandwiches, pastries, and healthy options available. Indoor and outdoor seating with range views.",
          hours: "Café open during facility hours. Great for pre-round fuel or post-game refreshments!"
        }
      },
      golfTips: [
        "🏌️‍♂️ Keep your head still during the swing - it's the foundation of consistency!",
        "⛳ Start with shorter clubs (7-iron, wedges) to build confidence and proper technique.",
        "🎯 Focus on making solid contact before worrying about distance.",
        "📊 Practice your short game - 60% of shots happen within 100 yards!",
        "💪 Strengthen your core for more power and stability."
      ],
      booking: "For bookings, please call us at 00000000000 or visit us at A20, Sidcup Bypass, Chislehurst, Kent BR7 6RP! 📞",
      location: "📍 We're located at A20, Sidcup Bypass, Chislehurst, Kent BR7 6RP. Easy to find with plenty of free parking!",
      hours: "🕐 We're open daily with extended hours! Call 00000000000 for today's specific times as they vary by season."
    };

    this.quickReplies = [
      "📍 Location & Directions",
      "💰 Pricing Info",
      "📞 Book Now",
      "🏌️‍♂️ Golf Tips",
      "🌤️ Weather Update",
      "⛳ Facilities Info"
    ];

    this.init();
  }

  init() {
    if (!this.chatContainer) return;

    this.assistantBtn?.addEventListener('click', () => this.toggleChat());
    this.closeBtn?.addEventListener('click', () => this.closeChat());
    this.sendBtn?.addEventListener('click', () => this.sendMessage());
    this.userInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Voice recognition setup
    this.setupVoiceRecognition();

    // Minimize functionality
    const minimizeBtn = document.getElementById('ai-minimize');
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => this.minimizeChat());
    }

    // Add notification badge
    this.addNotificationBadge();

    // Welcome message with delay
    setTimeout(() => {
      this.addMessage(this.getRandomResponse(this.responses.greetings), 'bot');
      this.showQuickReplies();
    }, 1000);

    // Auto-suggestions while typing
    this.userInput?.addEventListener('input', () => this.showSuggestions());
  }

  setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      const voiceBtn = document.getElementById('ai-voice-btn');
      const voiceIndicator = document.getElementById('voice-indicator');

      voiceBtn?.addEventListener('click', () => {
        if (this.isListening) {
          this.recognition.stop();
        } else {
          this.startVoiceRecognition();
        }
      });

      this.recognition.onstart = () => {
        this.isListening = true;
        if (voiceBtn) voiceBtn.innerHTML = '<i class="ri-stop-circle-line"></i>';
        if (voiceIndicator) voiceIndicator.style.display = 'block';
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (this.userInput) this.userInput.value = transcript;
        this.sendMessage();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (voiceBtn) voiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
        if (voiceIndicator) voiceIndicator.style.display = 'none';
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        if (voiceBtn) voiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
        if (voiceIndicator) voiceIndicator.style.display = 'none';
        this.addMessage("Sorry, I couldn't hear you clearly. Please try again! 🎤", 'bot');
      };
    } else {
      // Hide voice button if not supported
      const voiceBtn = document.getElementById('ai-voice-btn');
      if (voiceBtn) voiceBtn.style.display = 'none';
    }
  }

  addNotificationBadge() {
    if (!this.assistantBtn) return;
    const badge = document.createElement('div');
    badge.className = 'notification-badge';
    badge.textContent = '1';
    this.assistantBtn.appendChild(badge);
  }

  showQuickReplies() {
    if (!this.chatMessages) return;
    const quickReplyContainer = document.createElement('div');
    quickReplyContainer.className = 'quick-replies';

    this.quickReplies.forEach(reply => {
      const button = document.createElement('button');
      button.className = 'quick-reply-btn';
      button.textContent = reply;
      button.addEventListener('click', () => {
        this.handleQuickReply(reply);
        quickReplyContainer.remove();
      });
      quickReplyContainer.appendChild(button);
    });

    this.chatMessages.appendChild(quickReplyContainer);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  handleQuickReply(reply) {
    this.addMessage(reply, 'user');

    setTimeout(() => {
      let response = '';
      switch (reply) {
        case '📍 Location & Directions':
          response = this.responses.location;
          break;
        case '💰 Pricing Info':
          response = "For current pricing information, please call us at 00000000000. We offer competitive rates for all our facilities! 💰";
          break;
        case '📞 Book Now':
          response = this.responses.booking;
          break;
        case '🏌️‍♂️ Golf Tips':
          response = this.getRandomResponse(this.responses.golfTips);
          break;
        case '🌤️ Weather Update':
          response = this.getWeatherResponse();
          break;
        case '⛳ Facilities Info':
          response = "What would you like to know about? TopTracer Range 🎯, Golf Lessons 🏌️‍♂️, Adventure Golf 🦕, or our Café ☕?";
          break;
      }
      this.addMessage(response, 'bot');
    }, 800);
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    if (!this.chatContainer) return;
    this.chatContainer.style.display = 'flex';
    this.isOpen = true;
    this.userInput?.focus();

    // Remove notification badge
    const badge = this.assistantBtn?.querySelector('.notification-badge');
    if (badge) badge.remove();

    // Add opening animation
    this.chatContainer.style.animation = 'slideUp 0.3s ease-out';
  }

  closeChat() {
    if (!this.chatContainer) return;
    this.chatContainer.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => {
      this.chatContainer.style.display = 'none';
      this.isOpen = false;
    }, 300);
  }

  minimizeChat() {
    if (!this.chatContainer) return;
    this.chatContainer.style.height = '60px';
    if (this.chatMessages) this.chatMessages.style.display = 'none';
    const inputElement = document.getElementById('ai-chat-input');
    if (inputElement) inputElement.style.display = 'none';

    // Add restore button
    const restoreBtn = document.createElement('button');
    restoreBtn.innerHTML = '<i class="ri-arrow-up-line"></i> Restore Chat';
    restoreBtn.className = 'restore-chat-btn';
    restoreBtn.onclick = () => this.restoreChat();

    const header = document.getElementById('ai-chat-header');
    if (header) header.appendChild(restoreBtn);
  }

  restoreChat() {
    if (!this.chatContainer) return;
    this.chatContainer.style.height = '450px';
    if (this.chatMessages) this.chatMessages.style.display = 'flex';
    const inputElement = document.getElementById('ai-chat-input');
    if (inputElement) inputElement.style.display = 'flex';

    const restoreBtn = document.querySelector('.restore-chat-btn');
    if (restoreBtn) restoreBtn.remove();
  }

  sendMessage() {
    if (!this.userInput) return;
    const message = this.userInput.value.trim();
    if (!message || this.isTyping) return;

    this.addMessage(message, 'user');
    this.conversationHistory.push({ type: 'user', message, timestamp: Date.now() });
    this.userInput.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
      this.conversationHistory.push({ type: 'bot', message: response, timestamp: Date.now() });
    }, 1200);
  }

  showTypingIndicator() {
    if (!this.chatMessages) return;
    this.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message ai-bot typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    typingDiv.id = 'typing-indicator';
    this.chatMessages.appendChild(typingDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
  }

  addMessage(text, sender) {
    if (!this.chatMessages) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-${sender}`;

    if (sender === 'bot') {
      messageDiv.innerHTML = this.formatBotMessage(text);
    } else {
      messageDiv.textContent = text;
    }

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

    // Add message animation
    messageDiv.style.animation = 'messageSlide 0.3s ease-out';
  }

  formatBotMessage(text) {
    // Add emojis and formatting to bot messages
    return text.replace(/(\d{4}\s\d{3}\s\d{4})/g, '<strong>$1</strong>')
      .replace(/(TopTracer|Adventure Golf|Golf Lessons)/gi, '<strong>$1</strong>');
  }

  generateResponse(message) {
    const msg = message.toLowerCase();

    // Enhanced pattern matching
    if (this.isGreeting(msg)) {
      return this.getPersonalizedGreeting();
    }

    if (msg.includes('weather') || msg.includes('rain') || msg.includes('sunny') || msg.includes('temperature')) {
      return this.getWeatherResponse();
    }

    // Facility-specific responses
    if (msg.includes('toptracer') || msg.includes('driving range') || msg.includes('range')) {
      return this.responses.facilities.toptracer.main;
    }

    if (msg.includes('lesson') || msg.includes('instructor') || msg.includes('learn') || msg.includes('coaching')) {
      return this.responses.facilities.lessons.main;
    }

    if (msg.includes('adventure') || msg.includes('crazy golf') || msg.includes('mini golf') || msg.includes('dinosaur')) {
      return this.responses.facilities.adventure.main;
    }

    if (msg.includes('coffee') || msg.includes('cafe') || msg.includes('drink') || msg.includes('food') || msg.includes('eat')) {
      return this.responses.facilities.coffee.main;
    }

    // Enhanced booking responses
    if (msg.includes('book') || msg.includes('reserve') || msg.includes('appointment') || msg.includes('schedule')) {
      return this.responses.booking;
    }

    // Location and directions
    if (msg.includes('where') || msg.includes('location') || msg.includes('address') || msg.includes('directions') || msg.includes('how to get')) {
      return this.responses.location;
    }

    // Hours and timing
    if (msg.includes('hours') || msg.includes('open') || msg.includes('close') || msg.includes('time') || msg.includes('when')) {
      return this.responses.hours;
    }

    // Pricing
    if (msg.includes('price') || msg.includes('cost') || msg.includes('fee') || msg.includes('how much') || msg.includes('expensive')) {
      return "For current pricing information, please call us at 00000000000. We offer competitive rates for all our facilities! 💰";
    }

    // Golf tips
    if (msg.includes('tip') || msg.includes('advice') || msg.includes('improve') || msg.includes('better') || msg.includes('help me')) {
      return this.getRandomResponse(this.responses.golfTips);
    }

    // Thank you responses
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
      return "You're very welcome! 😊 Feel free to ask anything else. See you on the course! ⛳";
    }

    // Goodbye responses
    if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you')) {
      return "Thanks for chatting! Have a great day and we hope to see you soon at Sidcup Family Golf! 🏌️‍♂️⛳";
    }

    // Default with suggestions
    return "I'd love to help! 😊 I can assist with:\n🎯 TopTracer Range info\n🏌️‍♂️ Golf lessons\n🦕 Adventure golf\n📞 Bookings (00000000000)\n🌤️ Weather updates\n💡 Golf tips\n\nWhat interests you most?";
  }

  isGreeting(message) {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  getPersonalizedGreeting() {
    const hour = new Date().getHours();
    let timeGreeting = '';

    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    return `${timeGreeting}! Welcome to Sidcup Family Golf! 🏌️‍♂️ How can I help you today?`;
  }

  getWeatherResponse() {
    if (this.weatherService) {
      const weather = this.weatherService.getCurrentWeather();
      const advice = this.getWeatherAdvice(weather.desc.toLowerCase());
      return `🌤️ Current weather: ${weather.temp}, ${weather.desc}. ${advice}`;
    } else {
      // Fallback if weather service not available
      return "🌤️ The weather looks great for golf today! Our facilities are available in most weather conditions. Check our weather widget in the top navigation for current conditions!";
    }
  }

  getWeatherAdvice(weather) {
    if (weather.includes('sunny') || weather.includes('clear')) return "Perfect golf weather! ☀️ Don't forget sunscreen and water.";
    if (weather.includes('rain')) return "Light rain? No problem! Our covered bays keep you dry. 🌧️";
    if (weather.includes('cloudy')) return "Great conditions for golf - no glare! ☁️";
    return "Our facilities are ready for you! 🏌️‍♂️";
  }

  showSuggestions() {
    if (!this.userInput) return;
    const input = this.userInput.value.toLowerCase();
    if (input.length < 2) return;

    const suggestions = [
      'TopTracer Range booking',
      'Golf lesson prices',
      'Adventure golf courses',
      'Weather conditions',
      'Location and directions',
      'Opening hours today',
      'Group booking options',
      'Beginner golf tips'
    ].filter(suggestion =>
      suggestion.toLowerCase().includes(input)
    );

    if (suggestions.length > 0) {
      this.showSuggestionDropdown(suggestions);
    }
  }

  showSuggestionDropdown(suggestions) {
    // Remove existing dropdown
    const existingDropdown = document.querySelector('.suggestion-dropdown');
    if (existingDropdown) existingDropdown.remove();

    const dropdown = document.createElement('div');
    dropdown.className = 'suggestion-dropdown';

    suggestions.slice(0, 3).forEach(suggestion => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = suggestion;
      item.onclick = () => {
        if (this.userInput) this.userInput.value = suggestion;
        dropdown.remove();
        this.sendMessage();
      };
      dropdown.appendChild(item);
    });

    const inputContainer = document.getElementById('ai-chat-input');
    if (inputContainer) inputContainer.appendChild(dropdown);

    // Remove dropdown after 5 seconds
    setTimeout(() => {
      if (dropdown.parentNode) dropdown.remove();
    }, 5000);
  }

  startVoiceRecognition() {
    try {
      if (this.recognition) this.recognition.start();
    } catch (error) {
      console.log('Voice recognition error:', error);
    }
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const weatherService = new WeatherService();
  const golfAssistant = new GolfAssistant();

  // Connect weather service to AI assistant
  golfAssistant.weatherService = weatherService;
});
