import { FC } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";

type CustomDatePickerProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onChange: (date: Date) => void;
};

export const CustomDatePicker: FC<CustomDatePickerProps> = ({
  selectedDate,
  setSelectedDate,
  onChange,
}) => {
  // 日本語ロケールを登録
  registerLocale("ja", ja);
  setDefaultLocale("ja");

  const customStyles = {
    input: {
      borderRadius: "8px",
      height: "40px",
      padding: "0 12px",
      border: "1px solid #ccc",
      fontSize: "16px",
      width: "100%",
    },
  };

  return (
      <DatePicker
        dateFormat="yyyy-MM-dd HH:mm"
        locale="ja"
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date!);
          onChange(date!);
        }}
        showTimeSelect
        timeIntervals={30}
        timeFormat="HH:mm"
        timeCaption="時間"
        wrapperClassName="custom-datepicker-wrapper"
        calendarClassName="custom-datepicker-calendar"
        customInput={<input style={customStyles.input} />}
        popperProps={{
          strategy: "fixed",
          placement: "bottom"
        }}
      />
  );
};


