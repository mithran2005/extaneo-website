import React, { useState, useEffect, useRef } from 'react';
import { 
  MonitorSmartphone, 
  Rocket, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Code, 
  Paintbrush, 
  MessageSquare,
  Menu,
  X,
  Phone,
  Mail,
  CreditCard,
  Smartphone
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayPage, setDisplayPage] = useState('home');
  const [fade, setFade] = useState('in');
  const [cardsVisible, setCardsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'business',
    pagesNeeded: '1-3',
    designStyle: 'modern',
    colorPreference: '',
    features: [],
    description: ''
  });

  // Handle page navigation with smooth fade transitions
  const navigateTo = (page) => {
    if (page === displayPage) return;

    setFade('out');
    setIsMenuOpen(false);
    setTimeout(() => {
      setDisplayPage(page);
      window.scrollTo(0, 0);
      setFormStatus('idle'); // Reset the form back to the starting details page
      setFade('in');
    }, 300); // 300ms matches the CSS transition duration
  };

  // Trigger pricing cards animation when pricing page loads
  useEffect(() => {
    if (displayPage === 'pricing' && fade === 'in') {
      setTimeout(() => setCardsVisible(true), 100);
    } else {
      setCardsVisible(false);
    }
  }, [displayPage, fade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, value]
        : prev.features.filter(f => f !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Prepare the data to be sent using Web3Forms
    const submissionData = {
      access_key: "c9260d08-625c-418a-8668-6e0937aa1dae", 
      subject: `New Project Request from ${formData.name}`,
      from_name: "Extaneo Contact Form",
      Name: formData.name,
      Email: formData.email,
      "Website Type": formData.projectType,
      "Pages Needed": formData.pagesNeeded,
      "Features Needed": formData.features.length > 0 ? formData.features.join(', ') : 'None',
      "Design Style": formData.designStyle,
      "Brand Colors": formData.colorPreference || 'Not specified',
      "Project Description": formData.description
    };

    try {
      // Send the data directly to your email using Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        // Show success message and reset form in the UI
        setFormStatus('success');
        setFormData({
          name: '', email: '', phone: '', projectType: 'business', 
          pagesNeeded: '1-3', designStyle: 'modern', colorPreference: '', 
          features: [], description: ''
        });
      } else {
        setFormStatus('idle');
        alert("Oops! Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error(error);
      setFormStatus('idle');
      alert("Oops! Something went wrong. Please check your internet connection.");
    }
  };

  const scrollToForm = () => {
    navigateTo('start-project');
  };

  const pricingPlans = [
    {
      name: "Basic Website",
      pages: "5–10 pages",
      price: "₹3,000 – ₹5,000",
      popular: false,
      features: ["Mobile Responsive Design", "Contact Form", "Basic SEO Setup", "Fast Loading Speed"]
    },
    {
      name: "Small Business",
      pages: "10–12 pages",
      price: "₹15,000 – ₹20,000",
      popular: true,
      features: ["Custom Layouts", "Content Management System", "Advanced SEO", "Analytics Integration"]
    },
    {
      name: "E-commerce",
      pages: "50–100 products",
      price: "₹25,000 – ₹50,000",
      popular: false,
      features: ["Payment Gateway Setup", "Shopping Cart & Checkout", "Inventory Management", "User Accounts"]
    },
    {
      name: "Enterprise-Level",
      pages: "25–75 pages",
      price: "₹60,000 – ₹1,00,000",
      popular: false,
      features: ["Custom Web Applications", "Complex API Integrations", "High-Level Security", "Dedicated Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl tracking-tight text-slate-900">Exta<span className="text-indigo-600">neo</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigateTo('home')} 
                className={`relative font-medium transition-colors duration-300 py-1 ${displayPage === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 transform origin-center transition-transform duration-300 ${displayPage === 'home' ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
              <button 
                onClick={() => navigateTo('how-it-works')} 
                className={`relative font-medium transition-colors duration-300 py-1 ${displayPage === 'how-it-works' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                How it Works
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 transform origin-center transition-transform duration-300 ${displayPage === 'how-it-works' ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
              <button 
                onClick={() => navigateTo('pricing')} 
                className={`relative font-medium transition-colors duration-300 py-1 ${displayPage === 'pricing' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Pricing
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 transform origin-center transition-transform duration-300 ${displayPage === 'pricing' ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
              <button 
                onClick={() => navigateTo('start-project')}
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Start Your Project
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-md">
            <button 
              onClick={() => navigateTo('home')} 
              className={`w-full text-left block px-3 py-2 rounded-md font-medium transition-colors ${displayPage === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('how-it-works')} 
              className={`w-full text-left block px-3 py-2 rounded-md font-medium transition-colors ${displayPage === 'how-it-works' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              How it Works
            </button>
            <button 
              onClick={() => navigateTo('pricing')} 
              className={`w-full text-left block px-3 py-2 rounded-md font-medium transition-colors ${displayPage === 'pricing' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => navigateTo('start-project')}
              className="w-full text-left px-3 py-2 text-indigo-600 font-medium"
            >
              Start Your Project
            </button>
          </div>
        )}
      </nav>

      {/* Page Content wrapper with Fade Transition */}
      <main className={`flex-grow pt-16 transition-all duration-300 ease-in-out transform ${fade === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* --- HOME PAGE --- */}
        {displayPage === 'home' && (
          <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              <span>Affordable, Fast, and Professional</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl">
              Get a Stunning Website <br className="hidden md:block"/> Without the Premium Price Tag.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl">
              I build clean, modern, and responsive websites for small businesses and freelancers. Tell me what you need, and I'll bring it to life quickly and affordably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => navigateTo('start-project')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
              >
                Get Started Now <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => navigateTo('how-it-works')}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                See How it Works
              </button>
            </div>
          </section>
        )}

        {/* --- HOW IT WORKS PAGE --- */}
        {displayPage === 'how-it-works' && (
          <section className="py-20 bg-white min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why work with me?</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Skip the complicated agencies. I provide a streamlined, transparent process to get your business online.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    <MonitorSmartphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Mobile Responsive</h3>
                  <p className="text-slate-600">Your website will look perfect on phones, tablets, and desktops automatically.</p>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fast Turnaround</h3>
                  <p className="text-slate-600">No waiting for months. Most standard websites are completed and launched within days.</p>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                    <Paintbrush className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Modern Design</h3>
                  <p className="text-slate-600">Clean, beautiful layouts designed to capture your visitors' attention and build trust.</p>
                </div>
              </div>

              <div className="mt-16 text-center">
                <button onClick={() => navigateTo('pricing')} className="bg-indigo-50 text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-100 transition-all">
                  View Pricing Plans
                </button>
              </div>
            </div>
          </section>
        )}

        {/* --- PRICING PAGE --- */}
        {displayPage === 'pricing' && (
          <section className="py-20 bg-slate-50 min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Pick the package that fits your needs. No hidden fees or surprise charges.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col bg-white p-6 rounded-3xl border transition-all ease-out ${
                      cardsVisible ? 'opacity-100 translate-y-0 duration-700' : 'opacity-0 translate-y-16'
                    } ${
                      plan.popular 
                        ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:duration-300' 
                        : 'border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:duration-300'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-3xl">POPULAR</div>
                    )}
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <div className="text-sm font-medium text-slate-500 mb-4">{plan.pages}</div>
                    <div className="text-2xl font-extrabold text-indigo-600 mb-6">{plan.price}</div>
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0" /> 
                          <span className="text-slate-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => navigateTo('start-project')} className={`w-full py-3 rounded-xl font-bold transition-colors mt-auto ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'}`}>
                      Choose Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- START PROJECT / CONTACT PAGE --- */}
        {displayPage === 'start-project' && (
          <section className="py-20 bg-slate-900 text-white min-h-[80vh] flex flex-col justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's build your website</h2>
                <p className="text-slate-400 text-lg">Fill out this quick brief so I can understand your needs and give you exactly what you want.</p>
              </div>

              <div className="bg-white text-slate-900 rounded-3xl shadow-xl overflow-hidden">
                {formStatus === 'success' ? (
                  <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Project Brief Submitted!</h3>
                    <p className="text-slate-600 max-w-md mx-auto mb-8">
                      Your details have been sent to our consultant. Please choose a payment method below to proceed with your booking.
                    </p>
                    
                    {/* Payment Options Area */}
                    <div className="w-full max-w-md space-y-4">
                      {/* Credit / Debit Card */}
                      <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-indigo-600 hover:shadow-md transition-all bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                          </div>
                          <span className="font-semibold text-slate-800">Credit / Debit Card</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </button>

                      {/* UPI Options */}
                      <div className="w-full text-left p-4 border border-slate-200 rounded-2xl bg-slate-50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Smartphone className="w-6 h-6 text-green-600" />
                          </div>
                          <span className="font-semibold text-slate-800">UPI Payment</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:shadow-sm transition-all">
                            <span className="font-extrabold text-[#1A73E8] text-sm tracking-tight">GPay</span>
                          </button>
                          <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:shadow-sm transition-all">
                            <span className="font-extrabold text-[#5F259F] text-sm tracking-tight">PhonePe</span>
                          </button>
                          <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:shadow-sm transition-all">
                            <span className="font-extrabold text-[#00B9F1] text-sm tracking-tight">Paytm</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Consultant Contact Info */}
                    <div className="mt-8 pt-6 border-t border-slate-100 w-full max-w-md">
                      <p className="text-sm text-slate-500 mb-3">Need help with payment? Contact us:</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm font-medium text-slate-700">
                         <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-600"/> 8939721958</div>
                         <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-600"/> mithranm2005@gmail.com</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigateTo('home')}
                      className="mt-8 text-indigo-600 font-medium hover:text-indigo-700"
                    >
                      I'll pay later, return home
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 md:p-12">
                    
                    {/* Step 1: Contact Info */}
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                        <MessageSquare className="h-5 w-5 text-indigo-600" />
                        <h3 className="text-xl font-bold">1. Your Details</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                          <input 
                            type="text" required name="name" value={formData.name} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                          <input 
                            type="email" required name="email" value={formData.email} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Project Needs */}
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                        <Code className="h-5 w-5 text-indigo-600" />
                        <h3 className="text-xl font-bold">2. Website Requirements</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Website Type</label>
                          <select 
                            name="projectType" value={formData.projectType} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none bg-white"
                          >
                            <option value="business">Small Business Website</option>
                            <option value="portfolio">Personal Portfolio / Resume</option>
                            <option value="landing">Single Landing Page</option>
                            <option value="blog">Blog</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Pages</label>
                          <select 
                            name="pagesNeeded" value={formData.pagesNeeded} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none bg-white"
                          >
                            <option value="1">1 (Single Page)</option>
                            <option value="1-3">1 - 3 Pages</option>
                            <option value="4-6">4 - 6 Pages</option>
                            <option value="7+">7+ Pages</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Features Needed (Check all that apply)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['Contact Form', 'Photo Gallery', 'Testimonials', 'Booking System', 'Pricing Tables', 'FAQ Section'].map((feature) => (
                            <label key={feature} className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                              <input 
                                type="checkbox" 
                                value={feature}
                                checked={formData.features.includes(feature)}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600" 
                              />
                              <span className="ml-2 text-sm text-slate-700">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Design & Content */}
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                        <Paintbrush className="h-5 w-5 text-indigo-600" />
                        <h3 className="text-xl font-bold">3. Design & Content</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Style</label>
                          <select 
                            name="designStyle" value={formData.designStyle} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none bg-white"
                          >
                            <option value="modern">Modern & Clean</option>
                            <option value="corporate">Professional / Corporate</option>
                            <option value="creative">Creative & Bold</option>
                            <option value="minimal">Minimalist</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Brand Colors (Optional)</label>
                          <input 
                            type="text" name="colorPreference" value={formData.colorPreference} onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                            placeholder="e.g., Blue and White"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tell me more about your business/project *</label>
                        <textarea 
                          required name="description" value={formData.description} onChange={handleInputChange}
                          rows="4" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all resize-none"
                          placeholder="What do you do? Who are your customers? What is the main goal of this website?"
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? 'Sending Details...' : 'Submit Project Brief'}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-4">
                      Your details are sent securely directly to our team.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-6 cursor-pointer" onClick={() => navigateTo('home')}>
             <Code className="h-6 w-6 text-indigo-500" />
             <span className="font-bold text-xl tracking-tight text-white">Exta<span className="text-indigo-500">neo</span></span>
          </div>
          <p className="mb-6">Affordable, high-quality websites for everyone.</p>
          <p className="text-sm">© {new Date().getFullYear()} Extaneo Freelance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;