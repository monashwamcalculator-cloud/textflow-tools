import React from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 my-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Frequently Asked Questions</h3>
      <div className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
        {items.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">
              <span className="text-lg">{item.question}</span>
              <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition duration-200 group-open:rotate-180">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base prose dark:prose-invert max-w-none">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
