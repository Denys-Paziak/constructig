const baseURL =
  "https://api.telegram.org/bot8059265965:AAHFidOTP4Wrl9ZLEO-rFsj9m74D4llchwM/";

export const sendMessage = async (message: string): Promise<void> => {
  const url = `${baseURL}sendMessage?chat_id=-4581822352&text=${message}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();

    await Promise.reject(error.description || "Something went wrong...");
  }
};

const baseURLORDER =
  "https://api.telegram.org/bot7735776557:AAFgfEvNXGrO8KSojU1OkzO0-EAtQQx2epo/";

export const sendMessageToOrder = async (
  message: string,
  chatId: string
): Promise<void> => {
  const url = `${baseURLORDER}sendMessage?chat_id=${chatId}&text=${message}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();

    await Promise.reject(error.description || "Something went wrong...");
  }
};
