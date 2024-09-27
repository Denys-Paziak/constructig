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
