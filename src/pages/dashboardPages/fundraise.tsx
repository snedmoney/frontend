import React, { Key } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Progress } from "@nextui-org/react";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHandsHelping, FaRocket, FaChartLine } from 'react-icons/fa';
import { GiStairsGoal } from "react-icons/gi";
import { Link } from "@nextui-org/link";

type Campaign = {
  image: string;
  title: string;
  id: string;
  received: number;
  goal: number;
  token: string;
  chain: string;
  endDate: CalendarDate;
  status: "Active" | "Expired" | "Paused";
}

const rows: Campaign[] = [
  {
    image: 'https://images.unsplash.com/broken',
    title: "Save the Rainforest",
    id: "RF001",
    received: 15000,
    goal: 50000,
    token: "ETH",
    chain: "Ethereum",
    endDate: today(getLocalTimeZone()).add({ months: 6 }),
    status: "Active",
  },
  {
    image: 'https://images.unsplash.com/broken',
    title: "Clean Ocean Initiative",
    id: "OC002",
    received: 75000,
    goal: 100000,
    token: "USDC",
    chain: "Polygon",
    endDate: today(getLocalTimeZone()).add({ months: 3 }),
    status: "Active",
  },
  {
    image: 'https://images.unsplash.com/broken',
    title: "Education for All",
    id: "ED003",
    received: 30000,
    goal: 30000,
    token: "DAI",
    chain: "Ethereum",
    endDate: today(getLocalTimeZone()).subtract({ months: 1 }),
    status: "Expired",
  },
  {
    image: 'https://images.unsplash.com/broken',
    title: "Community Garden Project",
    id: "CG004",
    received: 5000,
    goal: 20000,
    token: "MATIC",
    chain: "Polygon",
    endDate: today(getLocalTimeZone()).add({ months: 2 }),
    status: "Paused",
  },
];

type Column = {
  key: string;
  label: string;
}

const columns: Column[] = [
  { key: "image", label: "IMAGE" },
  { key: "title", label: "TITLE" },
  { key: "id", label: "ID" },
  { key: "fundingStatus", label: "FUNDING STATUS" },
  { key: "token", label: "TOKEN" },
  { key: "chain", label: "CHAIN" },
  { key: "endDate", label: "END DATE" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "ACTIONS" },
];

const NoCampaigns = () => {
  return (
    <div className="text-default-400 p-8 rounded-lg text-center h-[200px] flex flex-col justify-center items-center">
      <p className="text-xl font-semibold">No fundraisers found</p>
      <p className="mt-2">Create a new campaign and get funded fast!</p>
    </div>
  )
}

const FundraisePage = () => {
  const handleNewCampaign = () => {
    // Implement your new campaign creation logic here
    console.log("Creating a new campaign");
  };

  const renderCell = (campaign: Campaign, columnKey: Key) => {
    const key = String(columnKey);
    switch (key) {
      case "image":
        return <Avatar showFallback src={campaign.image} radius="sm" className='bg-default-100' />
      case "fundingStatus":
        const progressValue = (campaign.received / campaign.goal) * 100;
        return (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs text-foreground/60">${campaign.received.toLocaleString()}</span>
              <span className="text-xs text-foreground/60">${campaign.goal.toLocaleString()}</span>
            </div>
            <Progress
              aria-label="Funding progress"
              value={progressValue}
              size="sm"
              className="max-w-md"
            />
          </div>
        );
      case "endDate":
        return campaign.endDate.toDate(getLocalTimeZone()).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      case "status":
        return (
          <span className={`px-2 py-1 rounded text-xs font-semibold
            ${campaign.status === 'Active' ? 'bg-success text-gray-600' :
              campaign.status === 'Paused' ? 'bg-primary text-gray-600' :
                'bg-danger-500 text-gray-600'}`}>
            {campaign.status}
          </span>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="md" variant="light">
                <BsThreeDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Campaign Actions">
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="share">Share</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return getKeyValue(campaign, key);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-4">Fundraise</h1>
      <div className="bg-default-100 p-8 rounded-lg mb-8 border border-default-200">
        <h2 className="text-xl font-semibold mb-6 text-center">Level Up Your Content Creation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <GiStairsGoal className="text-primary text-2xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-medium mb-2">Set Meaningful Goals</h3>
              <p className="text-sm text-default-600 leading-relaxed">
                Go beyond tipping. Create campaigns with clear objectives
                that resonate with your audience and fuel your creative vision.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaHandsHelping className="text-primary text-2xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-medium mb-2">Engage Your Supporters</h3>
              <p className="text-sm text-default-600 leading-relaxed">
                Transform your audience into active participants in your journey.
                Let them contribute directly to your next big project or milestone.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaRocket className="text-primary text-2xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-medium mb-2">Unlock New Possibilities</h3>
              <p className="text-sm text-default-600 leading-relaxed">
                Fund equipment upgrades, collaborate on ambitious projects, or
                support causes that align with your values and community.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaChartLine className="text-primary text-2xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-medium mb-2">Track Your Progress</h3>
              <p className="text-sm text-default-600 leading-relaxed">
                Watch your goals come to life with real-time funding updates.
                Celebrate milestones and keep your supporters invested in your success.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-base font-medium text-primary">
            Ready to turn your creative ideas into reality?
          </p>
          <p className="text-xs text-default-500 mt-2">
            Start your campaign today and take your content creation to the next level!
          </p>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <Button color="primary" variant="ghost" as={Link} radius="sm" href="/create/fundraiser" target="_blank">New Campaign</Button>
      </div>
      <Table aria-label="Fundraising campaigns table">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows} emptyContent={<NoCampaigns />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default FundraisePage;
