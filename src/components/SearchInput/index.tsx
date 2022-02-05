import { useState, ChangeEvent, MouseEvent, useRef } from "react";
import searchIcon from "../../assets/search.svg";
import "./index.scss";

interface IProps {
  onChange: (value: string) => void;
}

const SearchInput = (props: IProps) => {
  const { onChange } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLInputElement | null>(null);

  const handleClear = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setSearchTerm("");
  };

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    onChange(value);
  };

  return (
    <div
      className="search-container"
      onClickCapture={() => containerRef?.current?.focus()}
    >
      <input
        type="text"
        value={searchTerm}
        placeholder="Search books, genres, authors, etc."
        onChange={handleChange}
        ref={containerRef}
      />
      <button type="button" onClickCapture={handleClear}>
        {!searchTerm && <img alt="" src={searchIcon} />}
        {!!searchTerm && <span className="clear">&times;</span>}
      </button>
    </div>
  );
};

export default SearchInput;
