import {atom, useAtom} from "jotai";
import {RecordApi} from "@/services/datasheet/Record";
import {useParams} from "react-router-dom";
import {useQueryRecords} from "@/models/recordState";

const atomRecord = atom<any>(null)
const atomOpenModal = atom<boolean>(false)

export const useEditModal = () => {
    const {nodeId} = useParams() as any;
    const [record, setRecord] = useAtom(atomRecord)
    const [openModal, setOpenModal] = useAtom(atomOpenModal)
    const {handleGetRecords} = useQueryRecords(nodeId)

    const handleEdit = (r?: any) => {
        setRecord(r ? r : {})
        setOpenModal(true)
    }

    const handleClose = (r?: any) => {
        setRecord(null)
        setOpenModal(false)
    }

    const handleOk = () => {
        const records = [record]
        if (record.recId) {
            // 编辑
            console.log(`RecordApi update ${nodeId} : ${JSON.stringify(record)}`)
            RecordApi(nodeId)
                .updateBatch({type: 'fieldId', records})
                .then(() => handleGetRecords())
                .then(handleClose)
        } else {
            // 创建
            console.log(`RecordApi insert ${nodeId} : ${JSON.stringify(record)}`)
            RecordApi(nodeId)
                .insertBatch({type: 'fieldId', records})
                .then(() => handleGetRecords())
                .then(handleClose)
        }
    }

    return {
        record, setRecord,
        openModal, setOpenModal,
        handleEdit,
        handleOk,
        handleClose
    }
}
