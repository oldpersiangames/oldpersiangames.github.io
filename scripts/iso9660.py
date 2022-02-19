# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
import kaitaistruct
from kaitaistruct import KaitaiStruct, KaitaiStream, BytesIO


if parse_version(kaitaistruct.__version__) < parse_version('0.9'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.9 or later is required, but you have %s" % (kaitaistruct.__version__))

class Iso9660(KaitaiStruct):
    """ISO9660 is standard filesystem used on read-only optical discs
    (mostly CD-ROM). The standard was based on earlier High Sierra
    Format (HSF), proposed for CD-ROMs in 1985, and, after several
    revisions, it was accepted as ISO9960:1998.
    
    The format emphasizes portability (thus having pretty minimal
    features and very conservative file names standards) and sequential
    access (which favors disc devices with relatively slow rotation
    speed).
    """
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        pass

    class VolDescPrimary(KaitaiStruct):
        """
        .. seealso::
           Source - http://wiki.osdev.org/ISO_9660#The_Primary_Volume_Descriptor
        """
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.unused1 = self._io.read_bytes(1)
            if not self.unused1 == b"\x00":
                raise kaitaistruct.ValidationNotEqualError(b"\x00", self.unused1, self._io, u"/types/vol_desc_primary/seq/0")
            self.system_id = (self._io.read_bytes(32)).decode(u"UTF-8")
            self.volume_id = (self._io.read_bytes(32)).decode(u"UTF-8")
            self.unused2 = self._io.read_bytes(8)
            if not self.unused2 == b"\x00\x00\x00\x00\x00\x00\x00\x00":
                raise kaitaistruct.ValidationNotEqualError(b"\x00\x00\x00\x00\x00\x00\x00\x00", self.unused2, self._io, u"/types/vol_desc_primary/seq/3")
            self.vol_space_size = Iso9660.U4bi(self._io, self, self._root)
            self.unused3 = self._io.read_bytes(32)
            if not self.unused3 == b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00":
                raise kaitaistruct.ValidationNotEqualError(b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00", self.unused3, self._io, u"/types/vol_desc_primary/seq/5")
            self.vol_set_size = Iso9660.U2bi(self._io, self, self._root)
            self.vol_seq_num = Iso9660.U2bi(self._io, self, self._root)
            self.logical_block_size = Iso9660.U2bi(self._io, self, self._root)
            self.path_table_size = Iso9660.U4bi(self._io, self, self._root)
            self.lba_path_table_le = self._io.read_u4le()
            self.lba_opt_path_table_le = self._io.read_u4le()
            self.lba_path_table_be = self._io.read_u4be()
            self.lba_opt_path_table_be = self._io.read_u4be()
            self._raw_root_dir = self._io.read_bytes(34)
            _io__raw_root_dir = KaitaiStream(BytesIO(self._raw_root_dir))
            self.root_dir = Iso9660.DirEntry(_io__raw_root_dir, self, self._root)
            self.vol_set_id = (self._io.read_bytes(128)).decode(u"UTF-8")
            self.publisher_id = (self._io.read_bytes(128)).decode(u"UTF-8")
            self.data_preparer_id = (self._io.read_bytes(128)).decode(u"UTF-8")
            self.application_id = (self._io.read_bytes(128)).decode(u"UTF-8")
            self.copyright_file_id = (self._io.read_bytes(38)).decode(u"UTF-8")
            self.abstract_file_id = (self._io.read_bytes(36)).decode(u"UTF-8")
            self.bibliographic_file_id = (self._io.read_bytes(37)).decode(u"UTF-8")
            self.vol_create_datetime = Iso9660.DecDatetime(self._io, self, self._root)
            self.vol_mod_datetime = Iso9660.DecDatetime(self._io, self, self._root)
            self.vol_expire_datetime = Iso9660.DecDatetime(self._io, self, self._root)
            self.vol_effective_datetime = Iso9660.DecDatetime(self._io, self, self._root)
            self.file_structure_version = self._io.read_u1()
            self.unused4 = self._io.read_u1()
            self.application_area = self._io.read_bytes(512)

        @property
        def path_table(self):
            if hasattr(self, '_m_path_table'):
                return self._m_path_table if hasattr(self, '_m_path_table') else None

            _pos = self._io.pos()
            self._io.seek((self.lba_path_table_le * self._root.sector_size))
            self._raw__m_path_table = self._io.read_bytes(self.path_table_size.le)
            _io__raw__m_path_table = KaitaiStream(BytesIO(self._raw__m_path_table))
            self._m_path_table = Iso9660.PathTableLe(_io__raw__m_path_table, self, self._root)
            self._io.seek(_pos)
            return self._m_path_table if hasattr(self, '_m_path_table') else None


    class VolDescBootRecord(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.boot_system_id = (self._io.read_bytes(32)).decode(u"UTF-8")
            self.boot_id = (self._io.read_bytes(32)).decode(u"UTF-8")


    class Datetime(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.year = self._io.read_u1()
            self.month = self._io.read_u1()
            self.day = self._io.read_u1()
            self.hour = self._io.read_u1()
            self.minute = self._io.read_u1()
            self.sec = self._io.read_u1()
            self.timezone = self._io.read_u1()


    class DirEntry(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len = self._io.read_u1()
            if self.len > 0:
                self._raw_body = self._io.read_bytes((self.len - 1))
                _io__raw_body = KaitaiStream(BytesIO(self._raw_body))
                self.body = Iso9660.DirEntryBody(_io__raw_body, self, self._root)



    class VolDesc(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.type = self._io.read_u1()
            self.magic = self._io.read_bytes(5)
            if not self.magic == b"\x43\x44\x30\x30\x31":
                raise kaitaistruct.ValidationNotEqualError(b"\x43\x44\x30\x30\x31", self.magic, self._io, u"/types/vol_desc/seq/1")
            self.version = self._io.read_u1()
            if self.type == 0:
                self.vol_desc_boot_record = Iso9660.VolDescBootRecord(self._io, self, self._root)

            if self.type == 1:
                self.vol_desc_primary = Iso9660.VolDescPrimary(self._io, self, self._root)



    class PathTableEntryLe(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_dir_name = self._io.read_u1()
            self.len_ext_attr_rec = self._io.read_u1()
            self.lba_extent = self._io.read_u4le()
            self.parent_dir_idx = self._io.read_u2le()
            self.dir_name = (self._io.read_bytes(self.len_dir_name)).decode(u"UTF-8")
            if (self.len_dir_name % 2) == 1:
                self.padding = self._io.read_u1()



    class DirEntries(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.entries = []
            i = 0
            while True:
                _ = Iso9660.DirEntry(self._io, self, self._root)
                self.entries.append(_)
                if _.len == 0:
                    break
                i += 1


    class U4bi(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.le = self._io.read_u4le()
            self.be = self._io.read_u4be()


    class U2bi(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.le = self._io.read_u2le()
            self.be = self._io.read_u2be()


    class PathTableLe(KaitaiStruct):
        """
        .. seealso::
           Source - http://wiki.osdev.org/ISO_9660#The_Path_Table
        """
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.entries = []
            i = 0
            while not self._io.is_eof():
                self.entries.append(Iso9660.PathTableEntryLe(self._io, self, self._root))
                i += 1



    class DecDatetime(KaitaiStruct):
        """
        .. seealso::
           Source - http://wiki.osdev.org/ISO_9660#Date.2Ftime_format
        """
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.year = (self._io.read_bytes(4)).decode(u"ASCII")
            self.month = (self._io.read_bytes(2)).decode(u"ASCII")
            self.day = (self._io.read_bytes(2)).decode(u"ASCII")
            self.hour = (self._io.read_bytes(2)).decode(u"ASCII")
            self.minute = (self._io.read_bytes(2)).decode(u"ASCII")
            self.sec = (self._io.read_bytes(2)).decode(u"ASCII")
            self.sec_hundreds = (self._io.read_bytes(2)).decode(u"ASCII")
            self.timezone = self._io.read_u1()


    class DirEntryBody(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.len_ext_attr_rec = self._io.read_u1()
            self.lba_extent = Iso9660.U4bi(self._io, self, self._root)
            self.size_extent = Iso9660.U4bi(self._io, self, self._root)
            self.datetime = Iso9660.Datetime(self._io, self, self._root)
            self.file_flags = self._io.read_u1()
            self.file_unit_size = self._io.read_u1()
            self.interleave_gap_size = self._io.read_u1()
            self.vol_seq_num = Iso9660.U2bi(self._io, self, self._root)
            self.len_file_name = self._io.read_u1()
            self.file_name = (self._io.read_bytes(self.len_file_name)).decode(u"UTF-8")
            if (self.len_file_name % 2) == 0:
                self.padding = self._io.read_u1()

            self.rest = self._io.read_bytes_full()

        @property
        def extent_as_dir(self):
            if hasattr(self, '_m_extent_as_dir'):
                return self._m_extent_as_dir if hasattr(self, '_m_extent_as_dir') else None

            if (self.file_flags & 2) != 0:
                io = self._root._io
                _pos = io.pos()
                io.seek((self.lba_extent.le * self._root.sector_size))
                self._raw__m_extent_as_dir = io.read_bytes(self.size_extent.le)
                _io__raw__m_extent_as_dir = KaitaiStream(BytesIO(self._raw__m_extent_as_dir))
                self._m_extent_as_dir = Iso9660.DirEntries(_io__raw__m_extent_as_dir, self, self._root)
                io.seek(_pos)

            return self._m_extent_as_dir if hasattr(self, '_m_extent_as_dir') else None

        @property
        def extent_as_file(self):
            if hasattr(self, '_m_extent_as_file'):
                return self._m_extent_as_file if hasattr(self, '_m_extent_as_file') else None

            if (self.file_flags & 2) == 0:
                io = self._root._io
                _pos = io.pos()
                io.seek((self.lba_extent.le * self._root.sector_size))
                self._m_extent_as_file = io.read_bytes(self.size_extent.le)
                io.seek(_pos)

            return self._m_extent_as_file if hasattr(self, '_m_extent_as_file') else None


    @property
    def sector_size(self):
        if hasattr(self, '_m_sector_size'):
            return self._m_sector_size if hasattr(self, '_m_sector_size') else None

        self._m_sector_size = 2048
        return self._m_sector_size if hasattr(self, '_m_sector_size') else None

    @property
    def primary_vol_desc(self):
        if hasattr(self, '_m_primary_vol_desc'):
            return self._m_primary_vol_desc if hasattr(self, '_m_primary_vol_desc') else None

        _pos = self._io.pos()
        self._io.seek((16 * self.sector_size))
        self._m_primary_vol_desc = Iso9660.VolDesc(self._io, self, self._root)
        self._io.seek(_pos)
        return self._m_primary_vol_desc if hasattr(self, '_m_primary_vol_desc') else None
