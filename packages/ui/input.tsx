interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, onChange, form, placeholder, name }: Props): JSX.Element {
    const global = className ? className : "";

    return <input type={type} onChange={onChange} form={form} placeholder={placeholder} name={name} className={"w-full px-6 py-4 bg-neutral-800 text-white outline-none font-light " + global} />;
}
