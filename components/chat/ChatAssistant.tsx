import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  Minimize2,
  Headphones,
  User,
  CheckCheck,
  Check,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from "../../types";
import { getSmartResponse } from "./logikaChat";

interface ChatAssistantProps {
  logoUrl?: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  logoUrl = "/gambar/logo-icon-color.png",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  // Initialize messages from sessionStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem("alinlabs_chat_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [isOnline, setIsOnline] = useState(messages.length > 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("alinlabs_chat_history", JSON.stringify(messages));
    if (messages.length === 0) {
      setIsOnline(false);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      // Delay slighty to ensure full screen render on mobile
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isTyping]);

  // Prevent background scroll when open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Listen for open-chat event from mobile navigation
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const timestamp = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const isFirstMessage = messages.length === 0;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp,
      status: isFirstMessage ? "sent" : "delivered",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }

    const updateMsgStatus = (
      id: string,
      status: "sent" | "delivered" | "read",
    ) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg)),
      );
    };

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    // Fetch response asynchronously without blocking status updates
    let typingDuration = 3000;
    const responsePromise = getSmartResponse(text)
      .then((res) => {
        // Randomize typing duration: 3s for short, 5s for long as requested
        typingDuration = res.text.length > 100 ? 5000 : 3000;
        return res;
      })
      .catch(() => {
        typingDuration = 3000;
        return {
          text: "Maaf, ada kendala teknis. Silakan hubungi kami via WhatsApp.",
        } as import("./respon").BotResponse;
      });

    if (isFirstMessage) {
      await delay(1000);
      updateMsgStatus(userMsg.id, "delivered");

      await delay(2000);
      setIsOnline(true);

      await delay(1000); // Wait another 1 second so total is 3 seconds from delivered
      updateMsgStatus(userMsg.id, "read");
    } else {
      await delay(1000);
      updateMsgStatus(userMsg.id, "read");
    }

    await delay(1000);
    setIsTyping(true);

    const botResponse = await responsePromise;
    await delay(typingDuration);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "model",
      text: botResponse.text,
      buttons: botResponse.buttons,
      whatsappLink: botResponse.whatsappLink,
      suggestedTopics: botResponse.suggestedTopics,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e?.preventDefault) e.preventDefault();
    sendMessage(input);
  };

  const currentSuggestions = messages.filter((m) => m.role === "model").pop()
    ?.suggestedTopics || [
    "Layanan Kami",
    "Harga & Biaya",
    "Portofolio",
    "Hubungi WhatsApp",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleRealAgent = () => {
    // Redirect to WhatsApp
    window.open("https://wa.me/6281807000054", "_blank");
  };

  const handleClearChat = () => {
    setMessages([]);
    sessionStorage.removeItem("alinlabs_chat_history");
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed hidden md:block bottom-6 right-6 z-[50]"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#4a8cdf] hover:bg-[#3b7ac4] text-white rounded-full p-4 shadow-xl shadow-blue-500/30 transition-all duration-300 transform hover:scale-110 flex items-center justify-center ring-4 ring-white/20"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={window.innerWidth < 768 ? { y: '100%' } : { opacity: 0, y: 50, scale: 0.95 }}
            animate={window.innerWidth < 768 ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={window.innerWidth < 768 ? { y: '100%' } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`
              fixed z-[60] bg-white flex flex-col shadow-2xl border-slate-200 overflow-hidden
              /* Mobile Styles: Full Screen */
              inset-0 w-full h-full rounded-none
              /* Desktop Styles: Floating Card */
              sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[550px] sm:rounded-2xl sm:border
          `}
          >
            {/* Header */}
          <div className="bg-white md:bg-[#4a8cdf] text-slate-800 md:text-white p-4 flex justify-between items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] md:shadow-md z-10 shrink-0 border-b border-slate-100 md:border-b-0">
            <div className="flex items-center space-x-3">
              {/* Avatar Container */}
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                <img loading="lazy"
                  src="/gambar/logo-icon-color.png"
                  alt="AlinLabs"
                  className="md:hidden w-full h-full object-contain"
                />
                <img loading="lazy"
                  src="/gambar/logo-icon-white.png"
                  alt="AlinLabs"
                  className="hidden md:block w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight text-slate-800 md:text-white">
                  Customer Care
                </h3>
                {isOnline && (
                  <span className="flex items-center text-[10px] text-slate-500 md:text-blue-100 font-medium mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Online
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Real Agent Button */}
              <button
                onClick={handleRealAgent}
                className="flex items-center gap-1 bg-[#4a8cdf]/10 md:bg-white/20 hover:bg-[#4a8cdf]/20 md:hover:bg-white/30 text-[#4a8cdf] md:text-white rounded-full px-3 py-1.5 text-[10px] font-bold transition-all md:backdrop-blur-sm border border-[#4a8cdf]/20 md:border-white/10"
                title="Chat dengan agen manusia di WhatsApp"
              >
                <Headphones className="w-3 h-3" />
                <span className="hidden sm:inline">Real Agent</span>
                <span className="sm:hidden">Agent</span>
              </button>

              <button
                onClick={handleClearChat}
                className="text-slate-400 md:text-blue-200 hover:text-red-500 md:hover:text-red-300 transition-colors p-2 hover:bg-slate-100 md:hover:bg-white/10 rounded-full"
                title="Hapus riwayat chat"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 md:text-blue-100 hover:text-slate-800 md:hover:text-white transition-colors p-2 hover:bg-slate-100 md:hover:bg-white/10 rounded-full"
              >
                {/* Icon changes based on screen size conceptually, but X works for both contexts */}
                <div className="hidden sm:block">
                  <X className="w-5 h-5" />
                </div>
                <div className="sm:hidden">
                  <Minimize2 className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {msg.role === "model" && (
                  <div className="shrink-0 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <img loading="lazy"
                        src="/gambar/logo-icon-color.png"
                        alt="AI"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm flex flex-col ${
                    msg.role === "user"
                      ? "bg-[#4a8cdf] text-white rounded-br-sm"
                      : "bg-white text-slate-800 rounded-bl-sm border border-slate-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      {msg.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            if (btn.url.startsWith('http')) {
                              window.open(btn.url, '_blank');
                            } else {
                              window.history.pushState(null, '', btn.url);
                              window.dispatchEvent(new Event('popstate'));
                              if (window.innerWidth < 768) {
                                setIsOpen(false); // Close chat on mobile after navigation
                              }
                            }
                          }}
                          className="block w-full text-center bg-slate-50 hover:bg-slate-100 text-[#4a8cdf] border border-[#4a8cdf]/30 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.whatsappLink && (
                    <div className="mt-3">
                      <a
                        href={`https://wa.me/${msg.whatsappLink.phone.replace("+", "")}?text=${encodeURIComponent(msg.whatsappLink.text)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Buka WhatsApp
                      </a>

                      {/* Rich Snippet Preview */}
                      <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                            <MessageCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-700">
                            Official WhatsApp
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 break-all">
                          {msg.whatsappLink.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-1 flex items-center gap-1 ${msg.role === "user" ? "text-blue-100 self-start" : "text-slate-400 self-end"}`}
                  >
                    {msg.timestamp ||
                      new Date().toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    {msg.role === "user" && (
                      <div className="ml-0.5 flex items-center">
                        {msg.status === "sent" && (
                          <Check className="w-3.5 h-3.5 text-white/80" />
                        )}
                        {msg.status === "delivered" && (
                          <CheckCheck className="w-3.5 h-3.5 text-white/80" />
                        )}
                        {msg.status === "read" && (
                          <CheckCheck className="w-3.5 h-3.5 text-[#00ffff]" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="shrink-0 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <img loading="lazy"
                      src="/gambar/logo-icon-color.png"
                      alt="AI"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex space-x-1 mt-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions - Horizontal scroll */}
          {currentSuggestions.length > 0 && !isTyping && (
            <div className="bg-white border-t border-slate-100 px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x pb-2">
              {currentSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(suggestion)}
                  className="shrink-0 bg-transparent hover:bg-slate-50 border border-slate-200 text-[#4a8cdf] text-[11px] font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 shrink-0 pb-safe">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "44px";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 88)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Tulis pesan..."
                className="flex-1 bg-slate-100 border-0 text-slate-900 text-sm rounded-2xl px-5 py-3 focus:outline-none placeholder:text-slate-400 resize-none overflow-y-auto leading-tight"
                rows={1}
                style={{ height: "44px", minHeight: "44px", maxHeight: "88px" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="shrink-0 bg-[#4a8cdf] text-white w-[44px] h-[44px] rounded-full hover:bg-[#3b7ac4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-sm"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 ml-0.5" />
                )}
              </button>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};
