import { ChangeEvent, MouseEvent, useRef } from "react";
import searchIcon from "../../assets/search.svg";
import "./index.scss";

interface IProps {
  onChange: (value: string) => void;
  onClear: () => void;
  value: string;
}

const SearchInput = (props: IProps) => {
  const { onChange, value, onClear } = props;
  const containerRef = useRef<HTMLInputElement | null>(null);

  const handleClear = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    onClear();
  };

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(value);
  };

  return (
    <div
      className="search-container"
      onClickCapture={() => containerRef?.current?.focus()}
    >
      <input
        type="text"
        value={value}
        placeholder="Search books, genres, authors, etc."
        onChange={handleChange}
        ref={containerRef}
      />
      <button type="button" onClickCapture={handleClear}>
        {!value && <img alt="" src={searchIcon} />}
        {!!value && <span className="clear">&times;</span>}
      </button>
    </div>
  );
};

export default SearchInput;
