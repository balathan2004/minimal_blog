import React, { useContext, useState } from "react";

interface ReplyContextType {
  reply: string | false;
  setReply: React.Dispatch<React.SetStateAction<string | false>>;
}

const ReplyContext = React.createContext<ReplyContextType>({
  reply: false,
  setReply: () => {},
});

export default function ReplyHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reply, setReply] = useState<string | false>(false);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
}

export const useReplyContext = () => useContext(ReplyContext);
