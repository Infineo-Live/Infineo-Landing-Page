import { useState, useRef, useEffect } from 'react';
import '../styles/FloatingChatbot.css';

export default function FloatingChatbot() {
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
  const messagesEndRef = useRef(null);

  const faqs = [
    {
      question: "What age group do you cater to?",
      answer: "We serve children aged 5-14 years. Our programs are tailored for different age groups with age-appropriate content and teaching methods. Each module can be adapted to suit your child's developmental stage.",
      keyword: "age"
    },
    {
      question: "How long is each session?",
      answer: "Each session is 30 minutes long. This duration is scientifically proven to be optimal for children's attention span and learning retention. Sessions are held one-on-one with our expert instructors.",
      keyword: "session"
    },
    {
      question: "Can I choose the module for my child?",
      answer: "Absolutely! We offer 7 sacred modules: Ganesha, Hanuman, Krishna, Shiva, Shakti, Ramayana, and Mahabharata. During your free demo class, our instructors will help you choose the best module based on your child's interests and learning style.",
      keyword: "module"
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 100% money-back guarantee within the first 7 days if you're not satisfied. No questions asked! We're confident you'll love our program. Additionally, you can pause your subscription for up to 2 months anytime.",
      keyword: "refund"
    },
    {
      question: "How do you ensure one-on-one quality?",
      answer: "Each class is exclusively between your child and one of our trained instructors. We maintain a low instructor-to-student ratio and carefully match children with instructors who understand their learning style. All our instructors are background-checked and certified.",
      keyword: "quality"
    },
    {
      question: "Can my child take classes from home?",
      answer: "Yes! All our classes are conducted online via a secure video platform. Your child can join from anywhere using a computer, tablet, or smartphone. We provide session recordings so your child can review anytime.",
      keyword: "online"
    },
    {
      question: "What if my child misses a scheduled class?",
      answer: "You can reschedule missed classes anytime. We offer flexible rescheduling options and your unused sessions carry over to the next month. There are no penalties for rescheduling, as we understand life happens!",
      keyword: "reschedule"
    },
    {
      question: "How do I track my child's progress?",
      answer: "We provide monthly progress reports detailing your child's learning, improvements, and areas to focus on. You get detailed insights into their engagement, lessons learned, and recommendations for continued growth. Premium members receive weekly reports.",
      keyword: "progress"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Match user input to FAQ answers
    const matchedFaq = faqs.find(faq => 
      lowerInput.includes(faq.keyword) || 
      faq.question.toLowerCase().includes(lowerInput)
    );

    if (matchedFaq) {
      return matchedFaq.answer;
    } else if (lowerInput.includes('thank')) {
      return "You're welcome! If you have any other questions, feel free to ask! 😊";
    } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      return "Thank you for chatting with me! I hope to see you in our demo class soon! 👋";
    } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
      return "Hello! How can I help you today? Feel free to ask any questions about our classes! 😊";
    } else {
      return "That's a great question! For specific details, I'd recommend booking a free demo class where our instructors can give you personalized guidance. Is there anything else I can help with?";
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userInput, hasTyped: true }]);
    setUserInput('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(userInput);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse, hasTyped: true }]);
      setIsTyping(false);
    }, 800);
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
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chatbot-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Infineo Assistant"
      >
        <span className="chatbot-btn-icon">💬</span>
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          {/* Header */}
          <div className="chatbot-panel-header">
            <div className="chatbot-panel-header-content">
              <div className="chatbot-panel-avatar">✨</div>
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
              <div key={idx} className={`chatbot-message ${msg.type}`}>
                {msg.type === 'bot' && <span className="chatbot-message-avatar">🌟</span>}
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
              <div className="chatbot-message bot">
                <span className="chatbot-message-avatar">🌟</span>
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
          {messages.length <= 1 && (
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
              </div>
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chatbot-input"
              disabled={isTyping}
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
