export interface TaskOptionItem {
  id: number,
  name: string;
  type: number;
  default?: boolean,
  color: string;
  bgColor?: string;
}

interface TaskOptionProps {
  title: string;
  items: TaskOptionItem[];
}

const TaskOption = ({
    title,
    items
}: TaskOptionProps) => {
  return <div>
    <div className="font-medium text-sm mb-1 text-gray-500">{title}</div>
    <div className="flex flex-wrap gap-2">
        {items.map((item) => {
            return <div key={item.id} className="px-2 py-1 rounded text-sm cursor-pointer" style={{ backgroundColor: item.bgColor, color: item.color }}>{item.name}</div>;
            
        })}
    </div>
  </div>;
};

export default TaskOption