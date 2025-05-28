import cx from 'classnames'
export interface TaskOptionItem {
  id: number;
  name: string;
  type: number;
  default?: boolean;
  color: string;
  bgColor?: string;
}

interface TaskOptionProps {
  title: string;
  items: TaskOptionItem[];
  onChange: (id: number) => void;
  selectedValue: number;
}

const TaskOption = ({ items, onChange, selectedValue }: TaskOptionProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={cx("px-2 py-1 rounded text-sm cursor-pointer border-3", {
                [`border-[${item.color}]`]: selectedValue == item.id,
                [`border-transparent`]: selectedValue != item.id
              })}
              style={{ backgroundColor: item.bgColor, color: item.color }}
              onClick={() => onChange(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskOption;
