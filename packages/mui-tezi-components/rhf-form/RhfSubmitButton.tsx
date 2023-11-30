import { Breakpoint, Button, FormControlLabel, IconButton, Stack, Switch, useMediaQuery, useTheme } from "@mui/material"
import { useFormContext } from "react-hook-form";
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useState } from "react";
import SvgColor from "../SvgColor";
import { useNavigate } from "react-router-dom";

type rhfSubmitButtonProps = {
  actionType?: 'edit' | 'add-new' | 'copy',
  buttonLabel?: 'login' | string,
  isDesktop?: boolean,
  isDesktopThemeUpKey?: Breakpoint,
  loading?: boolean,
  pdfSvgFileName?: string, // "fill-type-pdf2"
  pdfNavigateLink?: string,
  size?: LoadingButtonProps['size']
};

export const RhfSubmitButton = ({
  actionType, 
  buttonLabel,
  isDesktop,
  isDesktopThemeUpKey = 'md',
  loading,
  pdfSvgFileName,
  pdfNavigateLink, 
  size='medium',
  ...props
}: rhfSubmitButtonProps) => {
  const theme = useTheme();
  isDesktop = isDesktop ?? useMediaQuery(theme.breakpoints.up(isDesktopThemeUpKey));
  const [allowEditToggle,setAllowEditToggle] = useState(false);
  const { formState: { isDirty, isSubmitting } } = useFormContext();
  const navigate = useNavigate();

  const PdfIcon = pdfSvgFileName ? <SvgColor iconFileName={pdfSvgFileName} sx={{width:30, height:30}} /> : <PictureAsPdfIcon  sx={{width:30, height:30}} />

  return (
    <Stack
        justifyContent='flex-end'
        direction='row'
        spacing={2}
    >
      {actionType === 'edit' && pdfNavigateLink && (
        isDesktop
          ? <Button
              variant="outlined"
              startIcon={PdfIcon}
              onClick={() => navigate(pdfNavigateLink)}
            >
              {(isDesktop) ? 'View PDF' : null}
            </Button>
          : <IconButton
              onClick={() => navigate(pdfNavigateLink)}
              sx={{color: '#2065D1', p:0}}
            >
              {PdfIcon}
            </IconButton>
      )}
      {actionType === 'edit' &&
        <FormControlLabel
          control={
            <Switch
              size="medium"
              checked={allowEditToggle}
              onChange={()=>setAllowEditToggle(!allowEditToggle)}
            />
          }
          disabled={!isDirty}
          label='Edit'
          onClick={() => !isDirty &&alert('Pls make changes to activate the switch.')}
        />
      }
      <LoadingButton
          size={size}
          type='submit'
          variant='contained'
          disabled={actionType === 'edit' ? !(allowEditToggle && isDirty) : !isDirty}
          loading={loading ?? isSubmitting}
          {...props}
      >
        {buttonLabel || (actionType === 'edit' ? 'Save' : 'Create')}
      </LoadingButton>
    </Stack>
  )
}