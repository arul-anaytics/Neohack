import { Scheduler } from "@aldabil/react-scheduler";
import { Fragment } from "react";
import { EVENTS, RESOURCES } from "./event";
import SchoolIcon from '@mui/icons-material/School';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const AdminSchedule = () => {
  return (
    <Fragment>
      <div className="t-text-black t-text-big t-font-medium t-text-center">
        Admin Schedule
      </div>
      <Scheduler
        resourceViewMode="tabs"
        events={EVENTS}
        resources={RESOURCES}
        eventRenderer={({ event }) => {
          if(event.admin_id == 1){
            return (
                <div className={`t-flex t-flex-col t-gap-10 t-border-[3px] t-bg-opacity-75 t-border-solid t-text-black t-p-10 t-h-full  ${event.completion_status == "Complete" ? "t-border-success" : event.completion_status == "pending" ? 't-border-secondary' : 't-border-primary'}`}>
                    <div className='t-flex t-gap-4'>
                        <div className='t-flex t-gap-2'><SchoolIcon /></div><span>{event.title}</span>
                    </div>
                    <div className='t-flex t-gap-4'>
                        <div className='t-flex t-gap-2'><PersonPinCircleIcon /></div><span>SKG</span>
                    </div>
                </div>
            );
        }
          return null;
        }}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
          subTextField: "mobile",
          avatarField: "title",
          colorField: "color"
        }}
        fields={[
          {
            name: "admin_id",
            type: "select",
            default: RESOURCES[0].admin_id,
            options: RESOURCES.map((res) => {
              return {
                id: res.admin_id,
                text: `${res.title} (${res.mobile})`,
                value: res.admin_id //Should match "name" property
              };
            }),
            config: { label: "Assignee", required: true }
          }
        ]}
      />
    </Fragment>
  );
}

export default AdminSchedule;