import React from "react";

import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { OrderStatusEnum } from "../../types";

type StatusBadgeProps = {
  status: OrderStatusEnum;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const badge = () => {
    switch (status) {
      case OrderStatusEnum.Waiting:
        return (
          <Chip
            sx={{ maxWidth: "50%" }}
            label="Waiting for chef"
            icon={<AccessAlarmsIcon />}
            color="error"
          />
        );

      case OrderStatusEnum.Preparing:
        return (
          <Chip
            sx={{ maxWidth: "50%" }}
            label="Being Prepared"
            icon={<HourglassBottomIcon />}
            color="secondary"
          />
        );

      case OrderStatusEnum.OnHold:
        return (
          <Chip
            sx={{ maxWidth: "50%" }}
            label="Paused"
            icon={<PauseCircleIcon />}
            color="warning"
          ></Chip>
        );

      case OrderStatusEnum.Ready:
        return (
          <Chip
            sx={{ maxWidth: "50%" }}
            label="Ready for pickup"
            icon={<DoneIcon />}
            color="success"
          />
        );

      default:
        return (
          <Chip
            sx={{ maxWidth: "50%" }}
            label="Error"
            icon={<AccessAlarmsIcon />}
            color="error"
          />
        );
    }
  };

  return badge();
};

export default StatusBadge;
