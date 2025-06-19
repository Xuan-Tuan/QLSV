import { useEffect, useState, memo } from "react";
import ModifyParentForm from "./modifyParentForm";
import { API_SERVICE } from "../../../helpers/apiHelper";
import AddParentModal from "./AddParentModal";
import DeleteParentForm from "./DeleteParentForm";
import ParentList from "./ParentList";
import { toast } from "react-toastify";

export default memo(function ManageParentPage() {
  const [parents, setParents] = useState([]);
  const [authPar, setAuthPar] = useState({
    email: "",
    password: "",
    role: "parent",
  });
  const [parInfo, setParInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [currentParentId, setCurrentParentId] = useState("");
  const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
  const [isConfirmModelDeleteOpen, setIsconfirmModalDeleteOpen] =
    useState(false);
  const [parentToDelete, setParentToDelete] = useState(null);
  const [isAddParentFormOpen, setIsAddParentFormOpen] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const addParent = async (data) => {
    const response = await API_SERVICE.post("user/parent", data);
    return response;
  };

  const deleteParent = async (id) => {
    const response = await API_SERVICE.delete("user/parent/" + id);
    return response;
  };

  const handleModifyParent = (e, parentId) => {
    e.preventDefault();
    setIsModifyFormOpen(true);
    setCurrentParentId(parentId);
  };

  const handleDeleteParent = (e, id) => {
    e.preventDefault();
    setParentToDelete(id);
    setIsconfirmModalDeleteOpen(true);
  };

  const confirmDeleteParent = async () => {
    setIsLoadingDelete(true);
    try {
      const result = await deleteParent(parentToDelete);
      if (result?.status === "success") {
        fetchParentList();
        toast.success("Parent deleted successfully");
      } else {
        toast.error("Failed to delete parent");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete parent");
    } finally {
      setIsLoadingDelete(false);
      setIsconfirmModalDeleteOpen(false);
      setParentToDelete(null);
    }
  };

  const validateParentData = (authPar, parInfo) => {
    if (
      !authPar.email ||
      !authPar.password ||
      !parInfo.name ||
      !parInfo.address ||
      !parInfo.phoneNumber
    ) {
      return { valid: false, message: "Please fill in all fields" };
    }

    if (authPar.password.length < 6) {
      return {
        valid: false,
        message: "Password must be at least 6 characters",
      };
    }

    if (parInfo.phoneNumber.length < 10 || parInfo.phoneNumber.length > 15) {
      return {
        valid: false,
        message: "Phone number must be between 10 and 15 characters",
      };
    }

    if (!/^\d+$/.test(parInfo.phoneNumber)) {
      return { valid: false, message: "Phone number must be numeric" };
    }

    if (parInfo.name.length < 3 || parInfo.name.length > 50) {
      return {
        valid: false,
        message: "Name must be between 3 and 50 characters",
      };
    }

    if (authPar.email.length < 6 || authPar.email.length > 50) {
      return {
        valid: false,
        message: "Email must be between 6 and 50 characters",
      };
    }

    return { valid: true };
  };

  const handleSubmitAddParent = async (e) => {
    e.preventDefault();

    const { valid, message } = validateParentData(authPar, parInfo);
    if (!valid) {
      toast.warn(message);
      return;
    }

    setIsLoadingAdd(true);
    try {
      const result = await addParent({
        email: authPar.email,
        password: authPar.password,
        role: authPar.role,
        name: parInfo.name,
        address: parInfo.address,
        phoneNumber: parInfo.phoneNumber,
      });

      if (result?.status?.toLowerCase() === "success") {
        toast.success("Parent Added succesfuly", {
          position: "bottom-left",
          autoClose: 5000,
          icon: "🎉",
        });
        await fetchParentList();
        setAuthPar({ email: "", password: "", role: "parent" });
        setParInfo({ name: "", address: "", phoneNumber: "" });
        setIsAddParentFormOpen(false);
      } else {
        toast.error("Failed to add parent");
      }
    } catch (error) {
      console.error("Error adding parent:", error);
      toast.error("Failed to add parent");
    } finally {
      setIsLoadingAdd(false);
    }
  };

  useEffect(() => {
    fetchParentList();
  }, []);

  const fetchParentList = async () => {
    setIsLoadingList(true);
    try {
      const response = await API_SERVICE.get("user/parent");
      if (response?.status === "success") {
        setParents(response?.data);
      } else {
        toast.error("Failed to fetch parent list");
      }
    } catch (error) {
      console.error("Error fetching parents:", error);
      toast.error("Error fetching parent list");
    }
    setIsLoadingList(false);
  };

  return (
    <div className="container mx-auto ">
      <div className="flex flex-row justify-between items-center mb-8">
        <div className="flex flex-col justify-between items-center text-uit font-semibold">
          <div className="p-4 text-lg uppercase">Quản lý phụ huynh</div>
          <div className="text-blue-700">{parents.length} phụ huynh</div>
        </div>
        <button
          disabled={isLoadingAdd}
          className={`${
            isLoadingAdd ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          } text-white font-semibold px-4 py-2 rounded transform transition-transform duration-300 hover:scale-110 hover:text-red-500 hover:bg-white hover:shadow-md`}
          onClick={() => setIsAddParentFormOpen(true)}
        >
          {isLoadingAdd ? "Đang thêm..." : "Thêm phụ huynh"}
        </button>
      </div>

      {isLoadingList ? (
        <div className="text-center my-4">Đang tải danh sách phụ huynh...</div>
      ) : (
        <ParentList
          parents={parents}
          handleModifyParent={handleModifyParent}
          handleDeleteParent={handleDeleteParent}
        />
      )}

      {isModifyFormOpen && (
        <ModifyParentForm
          parentId={currentParentId}
          closeForm={() => {
            setIsModifyFormOpen(false);
            fetchParentList();
          }}
        />
      )}

      {isConfirmModelDeleteOpen && (
        <DeleteParentForm
          onConfirm={confirmDeleteParent}
          onCancel={() => setIsconfirmModalDeleteOpen(false)}
          isLoadingDelete={isLoadingDelete}
        />
      )}

      {isAddParentFormOpen && (
        <AddParentModal
          authPar={authPar}
          setAuthPar={setAuthPar}
          parInfo={parInfo}
          setParInfo={setParInfo}
          onSubmit={handleSubmitAddParent}
          onClose={() => setIsAddParentFormOpen(false)}
        />
      )}
    </div>
  );
});
