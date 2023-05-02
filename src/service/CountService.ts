interface IError {
  error: string;
  error_ui: string;
}

export default class CountService {
  static async CountsFromServer(
    url: string,
    obj: {}
  ): Promise<{ count: number }> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-ZONT-Client": "dvm.baranov@gmail.com",
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error((data as IError).error_ui);
      }

      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
