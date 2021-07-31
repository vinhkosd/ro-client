// import { useForm } from "react-hook-form";
import { Form, Input, Modal, Button } from "antd";
import React from 'react'
import ReactDOM from 'react-dom'
const WithFormHOC = (componentProps) => {
    const [form] = Form.useForm();
    const { Component, props } = componentProps;
    return <Component form={form} {...props} />
}
export default WithFormHOC;