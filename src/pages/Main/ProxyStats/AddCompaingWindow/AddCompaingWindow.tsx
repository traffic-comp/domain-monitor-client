import React, { useState } from "react";
import BlockHeader from "../../../../components/BlockHeader/BlockHeader";
import Button from "../../../../components/Button/Button";
import CloseIcon from "../../../../components/icons/CloseIcon/CloseIcon";
import PlusIcon from "../../../../components/icons/PlusIcon/PlusIcon";
import s from "./addcompaingwindow.module.css";
import type { AddCompaingWindowProps } from "./AddCompaingWindow.props";
import { useGraphicStore } from "../../../../sotre/graphic";
const AddCompaingWindow = ({ ...props }: AddCompaingWindowProps) => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const { setIds } = useGraphicStore();
  const [value, setValue] = useState<string>("");

  const addCampaing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ids: string | null = localStorage.getItem("ids");

    if (ids && ids?.length) {
      const parsed: string[] = JSON.parse(ids);
      const mapped = parsed.map((id) => Number(id));

      const valueArray = value.split(" ");
      const result = [...mapped, ...valueArray.map((item) => Number(item))];
      localStorage.setItem("ids", JSON.stringify(result));
      setIds(result);
    }
  };

  return (
    <div className={s.addcampaing} {...props}>
      <Button click={() => setIsShowed(!isShowed)}>
        <PlusIcon />
      </Button>
      {isShowed ? (
        <div className={s.addcampaingblock}>
          <div className={s.capaingContainer}>
            <BlockHeader title="Add new Campaing">
              <CloseIcon click={() => setIsShowed(false)} className="pointer" />
            </BlockHeader>
            <form onSubmit={addCampaing}>
              <input
                type="text"
                placeholder="1 2 13 45"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                value={value}
              />
              <Button>Add</Button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddCompaingWindow;
