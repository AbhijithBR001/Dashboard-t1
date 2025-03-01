import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  sold: number;
  bought: number;
  blocked: boolean;
  rating: number;
  image: string;
}

interface UserTableProps {
  searchTerm: string;
}

const UserTable: React.FC<UserTableProps> = ({ searchTerm }) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Yeray Rosalos",
      email: "yerayrosalos@gmail.com",
      phone: "+91-098765432",
      sold: 2,
      bought: 1,
      blocked: true,
      rating: 3,
      image: "/user.png",
    },
    {
      id: "2",
      name: "Talah Cotton",
      email: "talahcotton2@gmail.com",
      phone: "+91-098765432",
      sold: 0,
      bought: 5,
      blocked: false,
      rating: 4,
      image: "/user2.png",
    },
    {
      id: "3",
      name: "Yeray Rosalos",
      email: "yerayrosalos@gmail.com",
      phone: "+91-098765432",
      sold: 2,
      bought: 1,
      blocked: true,
      rating: 3,
      image: "/user.png",
    },
    {
      id: "4",
      name: "Talah Cotton",
      email: "talahcotton2@gmail.com",
      phone: "+91-098765432",
      sold: 0,
      bought: 5,
      blocked: false,
      rating: 4,
      image: "/user2.png",
    },
    {
      id: "5",
      name: "Test User",
      email: "testuser@gmail.com",
      phone: "+91-123456789",
      sold: 5,
      bought: 2,
      blocked: false,
      rating: 5,
      image: "/user.png",
    },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / 5);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleBlockUnblock = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  const handleDelete = () => {
    if (selectedUsers.length === 0) return;
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUsers.includes(user.id))
    );
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white  w-full p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">User Deal</th>
              <th className="py-2 px-4 text-left">Block / Unblock</th>
              <th className="py-2 px-4 text-left">Ratings</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-4 px-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-red-500">{user.sold} Sold</p>
                    <p className="text-green-500">{user.bought} Bought</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Button
                    onClick={() => handleBlockUnblock(user.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      user.blocked
                        ? "bg-transparent text-red-500 border border-red-500 hover:bg-red-100"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {user.blocked ? "Block" : "Unblock"}
                  </Button>
                </td>
                <td className="py-4 px-4">
                  <div className="flex">{renderRating(user.rating)}</div>
                </td>
                <td className="py-4 px-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      <div className="flex flex-col space-y-1 bg-white">
                        <Button
                          variant="ghost"
                          className="justify-start text-sm"
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start text-sm text-red-500"
                        >
                          Delete User
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={selectedUsers.length === 0}
        >
          Delete
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {totalUsers} total users
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500 mr-2">Displaying page</span>
          <Button variant="outline" size="sm" className="h-8 w-16">
            First
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
            &lt;
          </Button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="h-8 w-8"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="h-8 w-8">
            &gt;
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-16">
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
