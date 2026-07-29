'use client';

import {Button, Form, Input, Select, message} from 'antd';
import {trackEvent} from '@/lib/analytics';

type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  company?: string;
};

export function ContactForm() {
  const [form] = Form.useForm<ContactFormValues>();

  async function submit(values: ContactFormValues) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Contact API request failed');

      trackEvent('generate_lead', {
        form_name: 'contact_enquiry',
        service: values.service || 'not_selected',
      });
      message.success('Thank you. Your enquiry has been sent.');
      form.resetFields();
    } catch {
      trackEvent('contact_form_error', {form_name: 'contact_enquiry'});
      message.error('Could not send your enquiry. Please try again.');
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={submit} aria-label="Contact enquiry form">
      <Form.Item name="name" label="Name" rules={[{required: true, message: 'Please enter your name'}]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{required: true, type: 'email', message: 'Please enter a valid email'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>
      <Form.Item name="service" label="Service">
        <Select
          options={['Water Treatment', 'Wastewater Treatment', 'Process Monitoring', 'Maintenance', 'Consultancy'].map(
            (value) => ({label: value, value}),
          )}
        />
      </Form.Item>
      <Form.Item
        name="message"
        label="Project requirements"
        rules={[{required: true, min: 15, message: 'Please provide at least 15 characters'}]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item name="company" className="honeypot" aria-hidden="true">
        <Input tabIndex={-1} autoComplete="off" />
      </Form.Item>
      <Button htmlType="submit" type="primary" size="large">
        Send enquiry
      </Button>
    </Form>
  );
}
