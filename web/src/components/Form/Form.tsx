import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface Props {
  onSubmit: (data: any) => void;
  initialData?: object;
  children: JSX.Element[];
  schema: Yup.ObjectSchema<any>;
}

const Form: React.FC<Props> = ({ initialData, children, onSubmit, schema }) => {
  const methods = useForm({
    defaultValues: initialData,
    validationSchema: schema,
  });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    getValue: methods.getValues,
                    errors: methods.errors,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default Form;
