import { useCallback, useState } from "react";

const defaultOptions = {
  open: false,
  type: "",
  title: "",
  closeOnDocumentClick: false
};

export const usePopup = (initialOptions = {}) => {
  const [popupOption, setPopupOption] = useState({
    ...defaultOptions,
    ...initialOptions
  });

  const openPopup = useCallback((options = {}) => {
    setPopupOption({
      ...defaultOptions,
      ...options,
      open: true
    });
  }, []);

  const closePopup = useCallback(() => {
    setPopupOption(defaultOptions);
  }, []);

  return {
    popupOption,
    setPopupOption,
    openPopup,
    closePopup
  };
};
