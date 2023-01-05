import * as React from 'react';
import * as Mui from '@mui/material';

interface ResponsiveDialogProps {
  isOpen: boolean;
  fn: {
    onAgreeRequest: () => void;
    onDisagreeRequest: () => void;
    onCloseRequest: () => void;
  };

  content: string;
}

export default function ResponsiveDialog({
  isOpen,
  fn,
  content,
}: ResponsiveDialogProps) {
  return (
    <Mui.Box>
      <Mui.Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'var(--black)',
            color: 'var(--white)',
          },
        }}
        open={isOpen}
        onClose={fn.onCloseRequest}
        aria-labelledby="responsive-dialog-title"
      >
        <Mui.DialogTitle id="responsive-dialog-title">
          Use Google location service?
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.DialogContentText
            sx={{
              color: 'var(--gray)',
            }}
          >
            {content}
          </Mui.DialogContentText>
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button
            autoFocus
            onClick={fn.onDisagreeRequest}
            variant="contained"
            color="error"
          >
            Disagree
          </Mui.Button>
          <Mui.Button
            onClick={fn.onAgreeRequest}
            autoFocus
            variant="contained"
            color="success"
          >
            Agree
          </Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog>
    </Mui.Box>
  );
}
