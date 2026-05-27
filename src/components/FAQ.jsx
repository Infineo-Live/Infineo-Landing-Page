import { useState } from 'react';
import '../styles/FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Neo, Infineo's friendly mascot! 👋 I'm here to answer any questions you have about our 1-on-1 classes. What would you like to know?"
    }
  ]);
  const [userInput, setUserInput] = useState('');

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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userInput }]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      const input = userInput.toLowerCase();

      // Match user input to FAQ answers
      const matchedFaq = faqs.find(faq => 
        input.includes(faq.keyword) || 
        faq.question.toLowerCase().includes(input)
      );

      if (matchedFaq) {
        botResponse = matchedFaq.answer;
      } else if (input.includes('thank')) {
        botResponse = "You're welcome! If you have any other questions, feel free to ask! 😊";
      } else if (input.includes('bye') || input.includes('goodbye')) {
        botResponse = "Thank you for chatting with me! I hope to see you in our demo class soon! 👋";
      } else if (input.includes('hi') || input.includes('hello')) {
        botResponse = "Hello! How can I help you today? Feel free to ask any questions about our classes! 😊";
      } else {
        botResponse = "That's a great question! For specific details, I'd recommend booking a free demo class where our instructors can give you personalized guidance. Is there anything else I can help with?";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);

    setUserInput('');
  };

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    
    setTimeout(() => {
      const matchedFaq = faqs.find(faq => faq.question === question);
      if (matchedFaq) {
        setMessages(prev => [...prev, { type: 'bot', text: matchedFaq.answer }]);
      }
    }, 500);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Have questions? Neo is here to help! 🤖</p>
        </div>

        <div className="faq-content">
          {/* Left side - Accordion */}
          <div className="faq-accordion-side">
            <div className="accordion-list">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <button
                    className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="accordion-question">{faq.question}</span>
                    <span className="accordion-icon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeIndex === index && (
                    <div className="accordion-content">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Neo Chatbot */}
          <div className="neo-chatbot">
            <div className="chatbot-header">
              <div className="neo-avatar">🤖</div>
              <div className="chatbot-title">
                <h3>Neo</h3>
                <p>Your Infineo Assistant</p>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.type}`}>
                  {msg.type === 'bot' && <span className="message-avatar">🤖</span>}
                  <div className="message-content">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-questions">
              <p className="quick-label">Quick Questions:</p>
              <div className="quick-buttons">
                {faqs.slice(0, 3).map((faq, idx) => (
                  <button
                    key={idx}
                    className="quick-btn"
                    onClick={() => handleQuickQuestion(faq.question)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="message-input"
              />
              <button onClick={handleSendMessage} className="send-btn">
                Send
              </button>
            </div>

            <p className="chatbot-footer">
              💡 Tip: You can ask me anything about our classes, pricing, or schedules!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
