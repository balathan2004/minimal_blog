import { useReplyContext } from "../context/Reply_context";
import { Snackbar } from "@mui/material";

export default function ReplyPopup() {
  const { reply, setReply } = useReplyContext();

  function handleClose() {
    setReply(false);
  }

  if (reply) {
    return (
      <>
        <Snackbar
          open={!!reply}
          autoHideDuration={6000}
          onClose={handleClose}
          message={reply}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </>
    );
  }
}
