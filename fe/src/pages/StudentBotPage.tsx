import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useEffect, useRef, FormEvent } from "react";
import MenuIcon from "@mui/icons-material/Menu"; // assuming SidebarTrigger
import Layout from "../Layout";

type Msg = { role: "user" | "bot"; text: string };

export default function StudentBotPage() {
  const [report, setReport] = useState<any>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("aiReport");
    if (raw) setReport(JSON.parse(raw));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const user: Msg = { role: "user", text: input };
    setMsgs((m) => [...m, user]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: user.text, context: report }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        { role: "bot", text: res.ok ? data.answer : data.error },
      ]);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: "Network error." }]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = ["Tell me what is my course", "What is my Chapter now"];

  return (
    <Layout>
      <Box height="100vh" display="flex" flexDirection="column">
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1}
          borderBottom={1}
          borderColor="divider"
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">My Support Bot</Typography>
          <Box width={40} />
        </Box>

        {/* Chat Area */}
        <Box flex={1} overflow="auto" px={2} py={3}>
          <Stack spacing={2}>
            {msgs.length === 0 && (
              <>
                <BotBubble>Hey there! I'm Ur Study Bot</BotBubble>
                <BotBubble>
                  I'm a study Bot. How can I help you today sweetheart?
                </BotBubble>
                {quickReplies.map((q) => (
                  <QuickBtn key={q} onClick={() => setInput(q)}>
                    {q}
                  </QuickBtn>
                ))}
              </>
            )}

            {msgs.map((m, i) =>
              m.role === "user" ? (
                <UserBubble key={i}>{m.text}</UserBubble>
              ) : (
                <Box key={i}>
                  <BotBubble>{m.text}</BotBubble>
                  <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
                    {quickReplies.map((q) => (
                      <QuickBtn key={q} onClick={() => setInput(q)}>
                        {q}
                      </QuickBtn>
                    ))}
                  </Stack>
                </Box>
              )
            )}

            <div ref={bottomRef} />
          </Stack>
        </Box>

        {/* Input Bar */}
        <Box
          component="form"
          onSubmit={send}
          display="flex"
          gap={2}
          p={2}
          borderTop={1}
          borderColor="divider"
        >
          <TextField
            fullWidth
            placeholder="Message…"
            size="small"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !input.trim()}
          >
            {loading ? "…" : "Send"}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      sx={{
        p: 1.5,
        px: 2,
        borderRadius: 2,
        maxWidth: "85%",
        bgcolor: "grey.100",
      }}
    >
      <Typography variant="body2">{children}</Typography>
    </Paper>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Paper
        sx={{
          p: 1.5,
          px: 2,
          borderRadius: 2,
          maxWidth: "85%",
          bgcolor: "primary.light",
        }}
      >
        <Typography variant="body2">{children}</Typography>
      </Paper>
    </Box>
  );
}

function QuickBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{ textTransform: "none" }}
    >
      {children}
    </Button>
  );
}
