set number " Показывает номера строк
colorscheme murphy " Настроить цветовую схему
set background=dark " Цвет фона

" Подсветка синтаксиса
syntax on

""" Дополнительные информационные панели
set laststatus=2

""" Кодировки
set encoding=utf-8  " Назначить utf-8 кодировкой по умолчанию
set showmatch

""" Настройки перемещения
nnoremap j gj 
nnoremap k gk

""" Настройки поиска
set showmatch		" Подсветить парный символ
set incsearch           " 
set hlsearch            " Подсветить совпадения

 
""" Настройки таба и отступов
set tabstop=4           " Количество пробелов от <TAB>
set expandtab           " Использование <TAB> вместо таба использует пробелы
set shiftwidth=4        " 4 пробела при нажатии <TAB>

set autoindent          " При копировании строки копировать и отступ (indent)
set smartindent         " Умный отступ (отступ после '{') 

""" Показывать положение курсора всё время.
set ruler

""" Сохранять историю комманд после выхода из Vim
if version >= 700
    set history=64
    set undolevels=128
    set undodir=~/.vim/undodir/
    set undofile
    set undolevels=1000
    set undoreload=10000
endif


" Настроить Vandle
set nocompatible              " be iMproved, required
filetype off                  " required
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'tpope/vim-fugitive'
Plugin 'git://git.wincent.com/command-t.git'
Plugin 'file:///home/gmarik/path/to/plugin'
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
call vundle#end()            " required
filetype plugin indent on    " required
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal

" Добавить меннеджер проектов
Plugin 'scrooloose/nerdtree'
nnoremap <F4> :NERDTreeToggle<CR>



