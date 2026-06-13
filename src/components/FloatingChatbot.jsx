import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/FloatingChatbot.css';
const SUPABASE_URL = 'https://aqizizxsmqpfmojkqnbv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ijzRJ_latM8NFyrDDaQS8Q_7zZHmr81';

export default function FloatingChatbot() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi little explorer! 🌟 I'm here to help you discover magical stories and answer your questions.",
      hasTyped: true
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const[careerFlow, setCareerFlow] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const faqs = [
    {
      question: "What age group do you cater to?",
      answer: "We serve children aged 5-14 years. Our programs are tailored for different age groups with age-appropriate content and teaching methods. Each module can be adapted to suit your child's developmental stage.",
      keywords: ["age", "old", "years"]
    },
    {
      question: "How long is each session?",
      answer: "Each session is 30 minutes long — scientifically proven to be optimal for children's attention span. Sessions are held one-on-one with our expert instructors.",
      keywords: ["session", "duration", "long", "time", "minutes"]
    },
    {
      question: "Can I choose the module for my child?",
      answer: "Absolutely! We offer 7 sacred modules: Ganesha, Hanuman, Krishna, Shiva, Shakti, Ramayana, and Mahabharata. During your free demo class, our instructors will help you choose the best one.",
      keywords: ["module", "story", "stories", "topic", "curriculum", "syllabus"]
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 100% money-back guarantee within the first 7 days, no questions asked. You can also pause your subscription for up to 2 months anytime.",
      keywords: ["refund", "money back", "cancel", "cancellation"]
    },
    {
      question: "How do you ensure one-on-one quality?",
      answer: "Each class is exclusively between your child and one trained instructor. All instructors are background-checked, certified, and matched based on your child's learning style.",
      keywords: ["quality", "instructor", "teacher", "one-on-one", "1-on-1", "1:1"]
    },
    {
      question: "Can my child take classes from home?",
      answer: "Yes! All classes are online via a secure video platform — join from a computer, tablet, or smartphone. Session recordings are provided so your child can review anytime.",
      keywords: ["online", "home", "platform", "device", "laptop", "zoom", "video"]
    },
    {
      question: "What if my child misses a scheduled class?",
      answer: "You can reschedule missed classes anytime — unused sessions carry over to the next month, with no penalties.",
      keywords: ["reschedule", "miss", "missed", "absent", "cancel class"]
    },
    {
      question: "How do I track my child's progress?",
      answer: "We provide monthly progress reports on learning, improvements, and engagement. Premium members receive weekly reports.",
      keywords: ["progress", "report", "track", "performance", "feedback"]
    },
    {
      question: "How much does it cost?",
      answer: "Pricing depends on the plan and number of sessions per week. The best way to see exact pricing for your child is to book a free 30-minute demo class — our team will walk you through plans during or after the session.",
      keywords: ["price", "pricing", "cost", "fee", "fees", "plan", "plans", "subscription", "payment", "pay"]
    },
    {
      question: "How do I book a demo class?",
      answer: "Just scroll to the 'Book Your Demo Class' section on our homepage and fill in your child's name, your contact details, age, and preferred language. It only takes a minute!",
      keywords: ["book", "demo", "trial", "free class", "register", "sign up", "signup"]
    },
    {
      question: "Who are the instructors?",
      answer: "Our instructors are trained storytellers and educators, background-checked and certified, with experience teaching children through mythology and value-based learning.",
      keywords: ["instructor", "teachers", "who teaches", "tutor", "mentor"]
    },
    {
      question: "What languages are available?",
      answer: "We currently offer classes in English and Hindi. You can select your preferred language while booking your demo class.",
      keywords: ["language", "hindi", "english", "regional"]
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us via the WhatsApp button on this page, or email us — our team typically responds within 24 hours. You're also welcome to ask me anything here!",
      keywords: ["contact", "support", "help", "email", "whatsapp", "reach", "call", "phone number"]
    },
    {
      question: "Is there a careers / internship program?",
      answer: "Yes! Infineo hires Storytelling Teachers and Interns across Game Dev, Social Media, Content, Video, HR, Sales & Marketing, and Web Development — all remote. Type 'apply' and I can help you get started right here!",
      keywords: ["career", "careers", "job", "jobs", "intern", "internship", "hiring", "vacancy", "work with", "join the team"]
    },
    {
      question: "Is my data safe / privacy policy?",
      answer: "We respect your privacy — your information is only used to contact you about Infineo classes and is never shared with third parties or used for spam.",
      keywords: ["privacy", "data safe", "secure", "gdpr", "information safe"]
    }
  ];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // focus input when panel opens for faster interaction
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);
  const careerSteps = [
    { key: 'fullName', prompt: "Great! Let's get you started. What's your full name?" },
    { key: 'roleType', prompt: "Are you applying as a Teacher or an Intern? (Reply 'Teacher' or 'Intern', and mention the role if it's an internship — e.g. 'Intern - Web Development')" },
    { key: 'email', prompt: "What's your email address?" },
    { key: 'phone', prompt: "What's your phone number (with country code, e.g. +91 9876543210)?" },
    { key: 'message', prompt: "Anything you'd like to share — experience, portfolio link, or availability? (Type 'skip' if nothing)" },
  ];
  const startCareerFlow = () => {
    setCareerFlow({ step: 0, data: {} });
    return careerSteps[0].prompt;
  };
  const submitCareerApplication = async (data) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/career_applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          full_name: data.fullName,
          role_type: data.roleType,
          email: data.email,
          phone: data.phone,
          message: data.message === 'skip' ? null : data.message,
        }),
      });
      if (!res.ok) throw new Error('Supabase error: ' + res.status);
      return "Thank you, " + data.fullName + "! 🎉 Your application has been submitted. Our team will reach out to you via email or phone soon. Good luck!";
    } catch (err) {
      console.error('Career application save failed:', err);
      return "Hmm, something went wrong saving your application. Please try again in a moment, or email us directly.";
    }
  };
   const validateCareerStep = (key, value) => {
    if (key === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? null : "That doesn't look like a valid email. Could you re-enter it? (e.g. name@example.com)";
    }
    if (key === 'phone') {
      const digits = value.replace(/[\s\-().]/g, '');
      return digits.length >= 7
        ? null : "That phone number looks too short. Please include country code, e.g. +91 9876543210.";
    }
    if (key === 'fullName' || key === 'roleType') {
      return value.trim().length > 0 ? null : "Please enter a value to continue.";
    }
    return null;
  };

  const generateBotResponse = async (input) => {
    const lowerInput = input.toLowerCase();
    if (careerFlow) {
      const currentStep = careerSteps[careerFlow.step];
      const error = validateCareerStep(currentStep.key, input);
      if (error) return error;

      const updatedData = { ...careerFlow.data, [currentStep.key]: input.trim() };
      const nextStepIdx = careerFlow.step + 1;

      if (nextStepIdx < careerSteps.length) {
        setCareerFlow({ step: nextStepIdx, data: updatedData });
        return careerSteps[nextStepIdx].prompt;
      } else {
        setCareerFlow(null);
        return await submitCareerApplication(updatedData);
      }
    }
     // ── Trigger career flow ──
    if (
      lowerInput.includes('apply') ||
      lowerInput.includes('career') ||
      lowerInput.includes('job application') ||
      (lowerInput.includes('intern') && (lowerInput.includes('apply') || lowerInput.includes('want')))
    ) {
      return startCareerFlow();
    }

    // ── FAQ matching (score-based: count keyword hits) ──
    let bestMatch = null;
    let bestScore = 0;
    for (const faq of faqs) {
      const score = faq.keywords.filter(kw => lowerInput.includes(kw)).length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }
    if (bestMatch) return bestMatch.answer;
    // ── Conversational fallbacks ──
    if (lowerInput.includes('thank')) {
      return "You're welcome! If you have any other questions, feel free to ask! 😊";
    }
    if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      return "Thank you for chatting with me! I hope to see you in our demo class soon! 👋";
    }
    if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
      return "Hello! How can I help you today? Ask about classes, pricing, modules, or even type 'apply' to join our team! 😊";
    }
    return "That's a great question! For specific details, I'd recommend booking a free demo class where our instructors can give you personalized guidance. You can also type 'apply' if you're interested in joining Infineo as a teacher or intern. Is there anything else I can help with?";
  };
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const currentInput = userInput.trim();
    setMessages(prev => [...prev, { type: 'user', text: currentInput, hasTyped: true }]);
    setUserInput('');
    setIsTyping(true);

    const botResponse = await generateBotResponse(currentInput);

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botResponse, hasTyped: true }]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question, hasTyped: true }]);

    setIsTyping(true);
    setTimeout(() => {
      const matchedFaq = faqs.find(faq => faq.question === question);
      if (matchedFaq) {
        setMessages(prev => [...prev, { type: 'bot', text: matchedFaq.answer, hasTyped: true }]);
      }
      setIsTyping(false);
    }, 700);
  };

  // theme-aware avatar and button icon
  const avatarIcon = theme === 'dark' ? '🌟' : '🌞';
  const floatingIcon = theme === 'dark' ? '💬' : '🗨️';

  return (
    <>
      {/* Floating Button */}
      <button
        className="chatbot-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Infineo Assistant"
        aria-pressed={isOpen}
      >
        <span className="chatbot-btn-icon">{floatingIcon}</span>
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="Infineo assistant">
          {/* Header */}
          <div className="chatbot-panel-header">
            <div className="chatbot-panel-header-content">
              <div className="chatbot-panel-avatar">{avatarIcon}</div>
              <div>
                <h3 className="chatbot-panel-title">Infineo Assistant</h3>
                <p className="chatbot-panel-status">Always here to help</p>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.type}`} style={{ animationDelay: `${idx * 40}ms` }}>
                {msg.type === 'bot' && <span className="chatbot-message-avatar">{avatarIcon}</span>}
                <div className="chatbot-message-bubble">
                  {msg.hasTyped ? (
                    <p>{msg.text}</p>
                  ) : (
                    <p className="typing-animation">
                      <span></span>
                      <span></span>
                      <span></span>
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot" style={{ animationDelay: `${messages.length * 40}ms` }}>
                <span className="chatbot-message-avatar">{avatarIcon}</span>
                <div className="chatbot-message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && !careerFlow && (
            <div className="chatbot-quick-questions">
              <p className="chatbot-quick-label">Popular Questions:</p>
              <div className="chatbot-quick-buttons">
                {faqs.slice(0, 3).map((faq, idx) => (
                  <button
                    key={idx}
                    className="chatbot-quick-btn"
                    onClick={() => handleQuickQuestion(faq.question)}
                  >
                    {faq.question.substring(0, 40)}...
                  </button>
                ))}
                <button className="chatbot-quick-btn" onClick={() => {
                  setMessages(prev => [...prev, { type: 'user', text: 'I want to apply', hasTyped: true }]);
                  setIsTyping(true);
                  setTimeout(() => {
                    setMessages(prev => [...prev, { type: 'bot', text: startCareerFlow(), hasTyped: true }]);
                    setIsTyping(false);
                  }, 600);
                }}>
                  💼 Apply for a job / internship
                </button>

              </div>
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder={careerFlow ? "Type your answer..." : "Ask me anything..."}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chatbot-input"
              disabled={isTyping}
              aria-label="Chat message input"
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send-btn"
              disabled={isTyping || userInput.trim() === ''}
              title="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
