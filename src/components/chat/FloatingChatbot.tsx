"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Bot, X, Send, Sparkles, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingChatbot({ lang }: { lang: "en" | "ar" }) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages
  } = useChat({
    api: "/api/chat",
    body: { lang },
    initialMessages: [
      {
        id: "sys-1",
        role: "assistant",
        content: lang === "ar" 
          ? "مرحباً بك في SSK. أنا المساعد الاستراتيجي الذكي. كيف يمكنني مساعدتك اليوم؟" 
          : "Welcome to SSK. I am the Strategic AI Advisor. How can I assist you today?"
      }
    ]
  });

  const isRtl = lang === "ar";

  // Common quick-action questions for drill down
  const quickQuestions = lang === "ar" ? [
    "ما هو مكتب التنفيذ المدار (MEO)؟",
    "كيف تدعمون التحول المؤسسي؟",
    "أريد التحدث مع شخص من المبيعات",
    "أعطني مثال على حالات الاستخدام (Use Case)"
  ] : [
    "What is the MEO?",
    "How do you support scaling?",
    "I'd like to contact the sales team",
    "Give me an Execution Use Case"
  ];

  const handleQuickQuestion = (q: string) => {
    append({
      role: 'user',
      content: q
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105",
          isRtl ? "left-6" : "right-6",
          isOpen ? "bg-slate-800 text-white rotate-90 opacity-0 scale-50 pointer-events-none" : "bg-ssk-cyan text-ssk-navy"
        )}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 z-50 flex flex-col w-[90vw] md:w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom flex-shrink-0",
          isRtl ? "left-6" : "right-6",
          isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none translate-y-10"
        )}
      >
        {/* Header */}
        <div className="bg-ssk-navy p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-ssk-cyan/20 p-2 rounded-full">
              <Sparkles className="w-5 h-5 text-ssk-cyan" />
            </div>
            <div>
              <h3 className="font-bold text-sm">SSK AI Advisor</h3>
              <p className="text-xs text-white/60">
                {isLoading ? (lang === "ar" ? "يكتب الآن..." : "Typing...") : (lang === "ar" ? "متصل للرد الفوري" : "Online & Ready")}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative scroll-smooth">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-3 max-w-[85%]",
                m.role === "user" 
                  ? (isRtl ? "mr-auto flex-row-reverse" : "ml-auto flex-row-reverse") 
                  : (isRtl ? "ml-auto" : "mr-auto")
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "bg-ssk-cyan text-ssk-navy rounded-tr-sm"
                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"
                )}
              >
                {/* Safe rendering for v3 string messages */}
                {(m as any).toolInvocations ? (
                   <div className="italic text-ssk-cyan font-medium text-xs">
                     ↳ {lang === "ar" ? "تفعيل نظام طلب التواصل..." : "Initiating contact protocol..."}
                   </div>
                ) : (
                   m.content || ""
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-sm w-fit shadow-sm max-w-[85%]">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (Drill-down prompts) */}
        {!isLoading && messages.length < 5 && (
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto shrink-0 pb-2 custom-scrollbar">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q)}
                className="whitespace-nowrap px-4 py-2 bg-slate-50 hover:bg-ssk-cyan/10 hover:text-ssk-navy hover:border-ssk-cyan/30 text-xs text-slate-600 border border-slate-200 rounded-full transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form 
            onSubmit={(e) => {
               // Prevent empty submission
               if (!input.trim()) e.preventDefault();
               else handleSubmit(e);
            }} 
            className="relative flex items-center"
          >
            <input
              value={input}
              onChange={handleInputChange}
              dir={isRtl ? "rtl" : "ltr"}
              placeholder={lang === "ar" ? "اكتب سؤالك هنا..." : "Type your question..."}
              className={cn(
                 "w-full bg-slate-50 border border-slate-200 rounded-full py-3 focus:outline-none focus:ring-2 focus:ring-ssk-cyan/30 focus:border-ssk-cyan transition-all text-sm shadow-inner",
                 isRtl ? "pr-5 pl-12" : "pl-5 pr-12"
              )}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                 "absolute p-2 bg-ssk-navy text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-ssk-navy transition-all active:scale-95",
                 isRtl ? "left-1.5" : "right-1.5"
              )}
            >
              <Send className={cn("w-4 h-4", isRtl && "scale-x-[-1]")} />
            </button>
          </form>
          <div className="text-center mt-3">
             <span className="text-[10px] text-slate-400 font-medium">SSK NEURAL NETWORK</span>
          </div>
        </div>
      </div>
    </>
  );
}
