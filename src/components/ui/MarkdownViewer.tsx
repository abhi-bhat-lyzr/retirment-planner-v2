// /* eslint-disable @next/next/no-img-element */
// import React from "react";
// import ReactMarkdown, { Components } from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { cn } from "@/lib/utils";

// interface Props {
//   content: string;
//   className?: string;
// }

// interface CodeProps extends React.HTMLAttributes<HTMLElement> {
//   inline?: boolean;
// }

// const components: Partial<Components> = {
//   h1: ({ children }) => (
//     <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>
//   ),
//   h2: ({ children }) => (
//     <h2 className="text-xl font-bold mt-5 mb-3 text-foreground">{children}</h2>
//   ),
//   h3: ({ children }) => (
//     <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">
//       {children}
//     </h3>
//   ),
//   p: ({ children }) => (
//     <p className="text-base leading-7 mb-3 text-foreground">{children}</p>
//   ),
//   ul: ({ children }) => (
//     <ul className="list-disc list-inside space-y-1 mb-4 text-foreground">
//       {children}
//     </ul>
//   ),
//   ol: ({ children }) => (
//     <ol className="list-decimal list-inside space-y-1 mb-4 text-foreground">
//       {children}
//     </ol>
//   ),
//   li: ({ children }) => <li className="text-foreground">{children}</li>,
//   blockquote: ({ children }) => (
//     <blockquote className="border-l-4 border-primary/50 pl-4 italic my-3 text-muted-foreground">
//       {children}
//     </blockquote>
//   ),
//   code: ({ className, children, inline, ...props }: CodeProps) => {
//     const match = /language-(\w+)/.exec(className || "");
//     return inline ? (
//       <code
//         className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono"
//         {...props}
//       >
//         {children}
//       </code>
//     ) : (
//       <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
//         <code
//           className={cn("text-sm", match ? `language-${match[1]}` : "")}
//           {...props}
//         >
//           {children}
//         </code>
//       </pre>
//     );
//   },
//   a: ({ children, href }) => (
//     <a
//       href={href}
//       className="text-primary hover:underline"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       {children}
//     </a>
//   ),
//   table: ({ children }) => (
//     <div className="overflow-x-auto mb-4">
//       <table className="w-full border-collapse border border-border">
//         {children}
//       </table>
//     </div>
//   ),
//   thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
//   tbody: ({ children }) => (
//     <tbody className="divide-y divide-border">{children}</tbody>
//   ),
//   tr: ({ children }) => <tr className="hover:bg-muted/50">{children}</tr>,
//   th: ({ children }) => (
//     <th className="border border-border px-4 py-2 text-left font-semibold">
//       {children}
//     </th>
//   ),
//   td: ({ children }) => (
//     <td className="border border-border px-4 py-2 text-foreground">
//       {children}
//     </td>
//   ),
//   img: ({ src, alt }) => (
//     <img src={src} alt={alt} className="rounded-lg max-w-full h-auto my-4" />
//   ),
//   hr: () => <hr className="my-6 border-border" />,
// };

// const MarkdownViewer: React.FC<Props> = ({ content, className }) => {
//   return (
//     <div className={cn("prose dark:prose-invert max-w-none", className)}>
//       <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default MarkdownViewer;

import React, { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  className?: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children: ReactNode;
}

interface ComponentProps {
  children: ReactNode;
}

interface LinkProps extends ComponentProps {
  href?: string;
}

const components = {
  code: ({ inline, children, ...props }: CodeProps) => {
    return inline ? (
      <code
        className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre className="bg-gray-100 rounded p-2 mb-2 overflow-x-auto">
        <code className="text-sm font-mono" {...props}>
          {children}
        </code>
      </pre>
    );
  },
  h1: ({ children }: ComponentProps) => (
    <h1 className="text-lg font-bold mb-2">{children}</h1>
  ),
  h2: ({ children }: ComponentProps) => (
    <h2 className="text-base font-bold mb-2">{children}</h2>
  ),
  h3: ({ children }: ComponentProps) => (
    <h3 className="text-sm font-semibold mb-2">{children}</h3>
  ),
  p: ({ children }: ComponentProps) => (
    <p className="mb-2 text-sm">{children}</p>
  ),
  ul: ({ children }: ComponentProps) => (
    <ul className="list-disc ml-4 mb-2 text-sm">{children}</ul>
  ),
  ol: ({ children }: ComponentProps) => (
    <ol className="list-decimal ml-4 mb-2 text-sm">{children}</ol>
  ),
  li: ({ children }: ComponentProps) => <li className="mb-1">{children}</li>,
  blockquote: ({ children }: ComponentProps) => (
    <blockquote className="border-l-2 border-gray-300 pl-3 italic mb-2 text-sm">
      {children}
    </blockquote>
  ),
  table: ({ children }: ComponentProps) => (
    <div className="overflow-x-auto mb-2">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: ComponentProps) => (
    <thead className="bg-gray-50">{children}</thead>
  ),
  tbody: ({ children }: ComponentProps) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }: ComponentProps) => <tr>{children}</tr>,
  th: ({ children }: ComponentProps) => (
    <th className="px-3 py-2 text-left font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }: ComponentProps) => (
    <td className="px-3 py-2 text-gray-700">{children}</td>
  ),
  a: ({ href, children }: LinkProps) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

const MarkdownViewer: React.FC<Props> = ({ content, className = "" }) => {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components as Components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
