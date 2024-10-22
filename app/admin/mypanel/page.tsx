//@ts-nocheck
'use client'
import { useState, useEffect } from "react";
import { doc, updateDoc, getDocs, collection, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import useAuth from "@/app/hooks/useAuth";
import useProtectedRoute from "@/app/hooks/useProtectedRoute";
import Loading from "@/app/components/loading";
import Modal from "@/app/components/modal";


function ItemList({ user, isModalOpen, setIsModalOpen, setUserSelected, state }) {
  const [confirmed, setConfirmed] = useState(false)
  const [role, setRole] = useState(user.role)

  const handleChangeRole = (user, newrole) => {
    setIsModalOpen(true)
    console.log(role)
    setRole(newrole)
    setUserSelected(user)
    console.log(role)
  }

  useEffect(() => {
    if (confirmed[0]) {
      updateDoc(doc(db, "users", user.id), {
        role: role
      })
      confirmed[1](false)
    }
  }, [confirmed[0]])

  return (
    <div key={user?.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
      <p className="text-lg">{user?.email}</p>
      <select
        value={user?.role}
        onChange={(e) => handleChangeRole(user, e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [allowAccess, setAllowAccess] = useState(false)
  const { loading, canAccess } = useProtectedRoute(['admin'], '/not-authorized')
  const [modal, setModal] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [selectedUser, setSelectedUser] = useState()



  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false)
      setAllowAccess(canAccess)
    }

    if (canAccess) {
      fetchUsers()
    }

  }, [isLoading, canAccess])

  useEffect(() => { console.log(modal) }, [modal])

  if (isLoading && !allowAccess) {
    return <Loading />
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <div className="space-y-4">
        {users.map(user => (
          <ItemList isModalOpen={modal} key={user.id} state={[confirmed, setConfirmed]} setUserSelected={setSelectedUser} user={user} setIsModalOpen={setModal} />
        ))}
      </div>
      {modal &&
        <Modal isOpen={modal} user={selectedUser} onClose={() => setConfirmed(false)} onConfirm={() => setConfirmed(true)} />
      }
    </div>
  );
}