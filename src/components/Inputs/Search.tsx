import { BiSearch } from "react-icons/bi"


export const Search = () => {
  return (
    <form action="">
    <div className="input-group rounded-3">
      <input
        type="search"
        className="form-control "
        placeholder="Product name "

      />

        <button
          className="input-group-text "
          type="button"
        >
     <BiSearch />
        </button>

    </div>
  </form>
  )
}
