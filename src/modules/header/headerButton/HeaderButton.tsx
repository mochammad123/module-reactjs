import CreateButton from "../../button/CreateButton";
import RejectButton from "../../button/RejectButton";
import WaitButton from "../../button/WaitButton";
import SearchButton from "../../button/SearchButton";

const HeaderButton = () => {
  return (
    <div className="flex justify-between items-center my-1">
      <div className="flex items-center gap-4">
        <CreateButton title="Add New" />
        <RejectButton title="Rejected Budget" count={10} />
        <WaitButton title="Waiting Budget" count={10} />
      </div>
      <div>
        <SearchButton />
      </div>
    </div>
  );
};

export default HeaderButton;
