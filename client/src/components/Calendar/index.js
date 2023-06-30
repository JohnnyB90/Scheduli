import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "WorkWeek",
      headerDateFormat: "dddd",
      cellHeight: 40,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        const dp = args.control;
        dp.clearSelection();
        if (modal.canceled) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventDeleted: (args) => {
        console.log("Event deleted: " + args.e.text());
      },
      eventMoveHandling: "Disabled",
      eventResizeHandling: "Disabled",
      eventClickHandling: "Disabled",
    };
  }

  componentDidMount() {

    // load resource and event data
    this.setState({
      startDate: DayPilot.Date.today(),
      events: [
        {
          id: 1,
          text: "Event 1",
          start: DayPilot.Date.today().addHours(10),
          end: DayPilot.Date.today().addHours(14)
        },
        {
          id: 2,
          text: "Event 2",
          start: "2022-06-02T10:00:00",
          end: "2022-06-02T11:00:00",
          barColor: "#38761d",
          barBackColor: "#93c47d"
        }
      ]
    });

  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  render() {
    return (
      <div>
        <DayPilotCalendar
          {...this.state}
          ref={this.calendarRef}
        />
      </div>
    );
  }
}

export default Calendar;
