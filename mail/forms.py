from django import forms


class ContactForm(forms.Form):
    message = forms.CharField(label='', widget=forms.TextInput(
        attrs={'placeholder': 'Напишите нам', 'class': 'email__message'}), required=True)
    from_email = forms.EmailField(label='', required=True, widget=forms.TextInput(attrs={'type':'email', 'placeholder': 'Ваша электронная почта', 'class': 'email__user'}))
