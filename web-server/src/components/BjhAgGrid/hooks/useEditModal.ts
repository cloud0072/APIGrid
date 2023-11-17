import {atom, useAtom} from "jotai";

const atomRecord = atom<any>(null)
const atomOpenModal = atom<boolean>(false)

export const useEditModal = () => {
  const [record, setRecord] = useAtom(atomRecord)
  const [openModal, setOpenModal] = useAtom(atomOpenModal)

  const handleEdit = (r?: any) => {
    setRecord(r ? r : {})
    setOpenModal(true)
  }

  const handleClose = (r?: any) => {
    setRecord(null)
    setOpenModal(false)
  }

  return {
    record, setRecord,
    openModal, setOpenModal,
    handleEdit,
    handleClose,
  }
}
