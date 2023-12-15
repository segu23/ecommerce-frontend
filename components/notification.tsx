import { Badge } from "@nextui-org/badge";
import { Divider } from "@nextui-org/divider";
import { NotificationIcon } from "./notificationIcon";

export default function Notification({ data }: { data: any }) {
    return (
        <Badge content="new" color="danger" size="sm" isInvisible={data.readState}>
            <div className="w-80">
                <Divider className="my-1" />
                <div className="flex">
                    <div className="self-center text-2xl px-2">
                        {data.icon}
                    </div>
                    <div>
                        <span>{data.title}</span>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        </Badge>
    )
}